const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Default missions
const DEFAULT_MISSIONS = [
  { missionId: 'tap_1000', title: 'Tap 1000 Times', description: 'Train your neural network with 1000 taps', type: 'tap', target: 1000, reward: 500, icon: '👆' },
  { missionId: 'tap_5000', title: 'Tap 5000 Times', description: 'Intensive training session', type: 'tap', target: 5000, reward: 2500, icon: '⚡' },
  { missionId: 'train_500', title: 'Train 500 Neurons', description: 'Earn 500 coins from tapping', type: 'train', target: 500, reward: 300, icon: '🧠' },
  { missionId: 'buy_machine', title: 'Activate a Machine', description: 'Purchase any AI mining machine', type: 'machine', target: 1, reward: 1000, icon: '⚙️' },
  { missionId: 'invite_friend', title: 'Invite a Friend', description: 'Refer a friend to Neura Coin', type: 'invite', target: 1, reward: 5000, icon: '👥' }
];

// GET /api/missions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const missions = DEFAULT_MISSIONS.map(m => {
      let progress = 0;
      switch (m.type) {
        case 'tap':
          progress = Math.min(user.totalTaps, m.target);
          break;
        case 'train':
          progress = Math.min(user.totalCoinsMined, m.target);
          break;
        case 'machine':
          progress = Math.min(user.machines.length, m.target);
          break;
        case 'invite':
          progress = Math.min(user.referrals.length, m.target);
          break;
        default:
          progress = 0;
      }
      return {
        ...m,
        progress,
        completed: progress >= m.target,
        percentage: Math.min(100, Math.round((progress / m.target) * 100))
      };
    });

    res.json({ missions });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/missions/complete
router.post('/complete', authMiddleware, async (req, res) => {
  try {
    const { missionId } = req.body;
    const mission = DEFAULT_MISSIONS.find(m => m.missionId === missionId);
    if (!mission) return res.status(400).json({ error: 'Invalid mission' });

    const user = await User.findOne({ telegramId: req.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if mission target is met
    let progress = 0;
    switch (mission.type) {
      case 'tap': progress = user.totalTaps; break;
      case 'train': progress = user.totalCoinsMined; break;
      case 'machine': progress = user.machines.length; break;
      case 'invite': progress = user.referrals.length; break;
    }

    if (progress < mission.target) {
      return res.status(400).json({ error: 'Mission not complete', progress, target: mission.target });
    }

    user.coins += mission.reward;
    user.experience += Math.floor(mission.reward / 10);
    await user.save();

    res.json({
      coins: user.coins,
      reward: mission.reward,
      message: `Mission completed! +${mission.reward} NEURA`
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
