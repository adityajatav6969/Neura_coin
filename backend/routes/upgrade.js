const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Upgrade definitions
const UPGRADES = {
  neural_speed: {
    type: 'tap_power',
    name: 'Neural Speed',
    description: 'Increase tap power',
    baseCost: 500,
    multiplierPerLevel: 0.5 // +50% per level
  },
  quantum_nodes: {
    type: 'machine_multiplier',
    name: 'Quantum Nodes',
    description: 'Multiply machine rewards',
    baseCost: 2000,
    multiplierPerLevel: 0.25 // +25% per level
  },
  ai_memory: {
    type: 'max_energy',
    name: 'AI Memory',
    description: 'Increase max energy',
    baseCost: 1000,
    multiplierPerLevel: 0.2 // +20% per level
  },
  data_compression: {
    type: 'energy_cost',
    name: 'Data Compression',
    description: 'Reduce energy cost per tap',
    baseCost: 1500,
    multiplierPerLevel: 0.15 // +15% per level
  }
};

// POST /api/upgrade/buy
router.post('/buy', authMiddleware, async (req, res) => {
  try {
    const { upgradeId } = req.body;
    const upgradeDef = UPGRADES[upgradeId];
    if (!upgradeDef) return res.status(400).json({ error: 'Invalid upgrade' });

    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let upgrade = user.upgrades.find(u => u.upgradeId === upgradeId);
    if (!upgrade) {
      upgrade = {
        upgradeId,
        type: upgradeDef.type,
        level: 0,
        multiplier: 1
      };
      user.upgrades.push(upgrade);
      upgrade = user.upgrades[user.upgrades.length - 1];
    }

    // Cost scales with level
    const cost = Math.floor(upgradeDef.baseCost * Math.pow(2, upgrade.level));

    if (user.coins < cost) {
      return res.status(400).json({ error: 'Not enough coins', required: cost });
    }

    user.coins -= cost;
    upgrade.level += 1;
    upgrade.multiplier = 1 + upgrade.level * upgradeDef.multiplierPerLevel;

    // Apply effects
    if (upgradeDef.type === 'tap_power') {
      user.tapPower = Math.floor(1 * upgrade.multiplier);
    }
    if (upgradeDef.type === 'max_energy') {
      user.maxEnergy = Math.floor(1000 * upgrade.multiplier);
    }

    await user.save();

    res.json({
      coins: user.coins,
      upgrades: user.upgrades,
      tapPower: user.tapPower,
      maxEnergy: user.maxEnergy,
      nextCost: Math.floor(upgradeDef.baseCost * Math.pow(2, upgrade.level))
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/upgrade/list
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const upgradesList = Object.entries(UPGRADES).map(([id, def]) => {
      const userUpgrade = user.upgrades.find(u => u.upgradeId === id);
      const level = userUpgrade?.level || 0;
      return {
        upgradeId: id,
        name: def.name,
        description: def.description,
        type: def.type,
        level,
        multiplier: userUpgrade?.multiplier || 1,
        cost: Math.floor(def.baseCost * Math.pow(2, level)),
        effect: `+${Math.round(def.multiplierPerLevel * 100)}% per level`
      };
    });

    res.json({ upgrades: upgradesList });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
