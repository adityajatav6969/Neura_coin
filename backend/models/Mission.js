const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  missionId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['tap', 'train', 'machine', 'invite', 'minigame'], required: true },
  target: { type: Number, required: true },
  reward: { type: Number, required: true },
  icon: { type: String, default: '🎯' },
  daily: { type: Boolean, default: true }
});

module.exports = mongoose.model('Mission', missionSchema);
