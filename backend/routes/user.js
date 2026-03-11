const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.regenerateEnergy();
    user.autoMiningRate = user.calculateAutoMiningRate();
    user.title = user.getTitle();
    await user.save();

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
