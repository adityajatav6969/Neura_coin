const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Machine definitions
const MACHINES = {
  neural_miner: { name: 'Neural Miner', cost: 5000, productionRate: 20 },
  quantum_processor: { name: 'Quantum Processor', cost: 20000, productionRate: 120 },
  ai_data_farm: { name: 'AI Data Farm', cost: 100000, productionRate: 500 },
  neural_supercomputer: { name: 'Neural Supercomputer', cost: 1000000, productionRate: 3000 }
};

// POST /api/machine/buy
router.post('/buy', authMiddleware, async (req, res) => {
  try {
    const { machineId } = req.body;
    const machineDef = MACHINES[machineId];
    if (!machineDef) return res.status(400).json({ error: 'Invalid machine' });

    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if already owned
    const existing = user.machines.find(m => m.machineId === machineId);
    if (existing) return res.status(400).json({ error: 'Machine already owned' });

    if (user.coins < machineDef.cost) {
      return res.status(400).json({ error: 'Not enough coins' });
    }

    user.coins -= machineDef.cost;
    user.machines.push({
      machineId,
      name: machineDef.name,
      level: 1,
      productionRate: machineDef.productionRate,
      baseProductionRate: machineDef.productionRate,
      lastClaim: Date.now(),
      active: true
    });

    user.autoMiningRate = user.calculateAutoMiningRate();
    await user.save();

    res.json({
      coins: user.coins,
      machines: user.machines,
      autoMiningRate: user.autoMiningRate
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/machine/upgrade
router.post('/upgrade', authMiddleware, async (req, res) => {
  try {
    const { machineId } = req.body;
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const machine = user.machines.find(m => m.machineId === machineId);
    if (!machine) return res.status(400).json({ error: 'Machine not found' });

    // Upgrade cost = base cost * level * 1.5
    const machineDef = MACHINES[machineId];
    const upgradeCost = Math.floor(machineDef.cost * machine.level * 1.5);

    if (user.coins < upgradeCost) {
      return res.status(400).json({ error: 'Not enough coins', required: upgradeCost });
    }

    user.coins -= upgradeCost;
    machine.level += 1;
    machine.productionRate = Math.floor(machine.baseProductionRate * machine.level * 1.2);

    // Apply quantum_nodes multiplier
    const qUpgrade = user.upgrades.find(u => u.type === 'machine_multiplier');
    if (qUpgrade && qUpgrade.multiplier > 1) {
      machine.productionRate = Math.floor(machine.productionRate * qUpgrade.multiplier);
    }

    user.autoMiningRate = user.calculateAutoMiningRate();
    await user.save();

    res.json({
      coins: user.coins,
      machines: user.machines,
      autoMiningRate: user.autoMiningRate,
      upgradeCost: Math.floor(machineDef.cost * machine.level * 1.5)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/machine/claim
router.post('/claim', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let totalClaimed = 0;
    const now = Date.now();

    user.machines.forEach(machine => {
      if (machine.active) {
        const elapsed = (now - machine.lastClaim.getTime()) / 60000; // minutes
        const earned = Math.floor(machine.productionRate * elapsed);
        totalClaimed += earned;
        machine.lastClaim = now;
      }
    });

    user.coins += totalClaimed;
    user.totalCoinsMined += totalClaimed;
    user.lastActive = now;
    await user.save();

    res.json({
      coins: user.coins,
      claimed: totalClaimed,
      machines: user.machines
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
