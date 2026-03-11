const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/tap
router.post('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Regenerate energy first
    user.regenerateEnergy();

    // Get energy cost per tap (modified by data_compression upgrade)
    const compressionUpgrade = user.upgrades.find(u => u.type === 'energy_cost');
    const energyCost = Math.max(1, Math.floor(1 / (compressionUpgrade?.multiplier || 1)));

    if (user.energy < energyCost) {
      return res.status(400).json({ error: 'Not enough energy', energy: user.energy });
    }

    // Calculate coins per tap
    const tapUpgrade = user.upgrades.find(u => u.type === 'tap_power');
    const effectiveTapPower = user.tapPower * (tapUpgrade?.multiplier || 1);

    user.energy -= energyCost;
    user.coins += effectiveTapPower;
    user.totalTaps += 1;
    user.totalCoinsMined += effectiveTapPower;
    user.experience += 1;
    user.lastActive = Date.now();

    // Level up check
    const xpNeeded = user.level * 100;
    if (user.experience >= xpNeeded) {
      user.level += 1;
      user.experience -= xpNeeded;
      user.title = user.getTitle();
    }

    await user.save();

    res.json({
      coins: user.coins,
      energy: user.energy,
      tapPower: effectiveTapPower,
      totalTaps: user.totalTaps,
      level: user.level,
      experience: user.experience,
      title: user.title
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
