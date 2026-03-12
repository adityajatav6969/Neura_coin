const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateTelegramData } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/telegram
router.post('/telegram', async (req, res) => {
  try {
    const { initData, user: telegramUser } = req.body;

    // In production, validate initData
    if (initData !== 'dev_mode' && process.env.BOT_TOKEN && process.env.BOT_TOKEN !== 'your_telegram_bot_token') {
      const isValid = validateTelegramData(initData, process.env.BOT_TOKEN);
      if (!isValid) return res.status(401).json({ error: 'Invalid Telegram data' });
    }

    if (!telegramUser || !telegramUser.id) {
      return res.status(400).json({ error: 'Missing Telegram user data' });
    }

    let user = await User.findOne({ telegramId: String(telegramUser.id) });

    if (!user) {
      user = new User({
        telegramId: String(telegramUser.id),
        username: telegramUser.username || telegramUser.first_name || 'Anonymous',
        avatar: telegramUser.photo_url || '',
        coins: 0,
        energy: 1000,
        maxEnergy: 1000,
        tapPower: 1,
        autoMiningRate: 0,
        level: 1,
        experience: 0,
        title: 'Neural Trainee',
        machines: [],
        upgrades: [
          { upgradeId: 'neural_speed', type: 'tap_power', level: 0, multiplier: 1 },
          { upgradeId: 'quantum_nodes', type: 'machine_multiplier', level: 0, multiplier: 1 },
          { upgradeId: 'ai_memory', type: 'max_energy', level: 0, multiplier: 1 },
          { upgradeId: 'data_compression', type: 'energy_cost', level: 0, multiplier: 1 }
        ]
      });
      await user.save();
    } else {
      // Calculate offline earnings
      const offlineEarnings = user.calculateOfflineEarnings();
      if (offlineEarnings > 0) {
        user.coins += offlineEarnings;
      }
      user.regenerateEnergy();
      user.lastActive = Date.now();
      user.autoMiningRate = user.calculateAutoMiningRate();
      user.title = user.getTitle();
      await user.save();
    }

    const token = jwt.sign(
      { telegramId: user.telegramId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const offlineEarnings = user.calculateOfflineEarnings();

    res.json({
      token,
      user: {
        telegramId: user.telegramId,
        username: user.username,
        avatar: user.avatar,
        coins: user.coins,
        energy: user.energy,
        maxEnergy: user.maxEnergy,
        tapPower: user.tapPower,
        autoMiningRate: user.autoMiningRate,
        level: user.level,
        experience: user.experience,
        title: user.title,
        machines: user.machines,
        upgrades: user.upgrades,
        totalTaps: user.totalTaps,
        totalCoinsMined: user.totalCoinsMined,
        referrals: user.referrals
      },
      offlineEarnings
    });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
