const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  machineId: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  productionRate: { type: Number, required: true },
  baseProductionRate: { type: Number, required: true },
  lastClaim: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const upgradeSchema = new mongoose.Schema({
  upgradeId: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: Number, default: 0 },
  multiplier: { type: Number, default: 1 }
});

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String, default: 'Anonymous' },
  avatar: { type: String, default: '' },
  coins: { type: Number, default: 0 },
  energy: { type: Number, default: 1000 },
  maxEnergy: { type: Number, default: 1000 },
  tapPower: { type: Number, default: 1 },
  autoMiningRate: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  title: { type: String, default: 'Neural Trainee' },
  machines: [machineSchema],
  upgrades: [upgradeSchema],
  referrals: [{ type: String }],
  referredBy: { type: String, default: null },
  totalTaps: { type: Number, default: 0 },
  totalCoinsMined: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  lastEnergyUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Calculate level title
userSchema.methods.getTitle = function () {
  const titles = [
    'Neural Trainee',
    'Data Analyst',
    'ML Engineer',
    'AI Researcher',
    'Neural Architect',
    'Quantum Coder',
    'AI Architect',
    'Neural Master',
    'AI Overlord',
    'Singularity'
  ];
  const idx = Math.min(this.level - 1, titles.length - 1);
  return titles[idx];
};

// Calculate auto mining rate from machines
userSchema.methods.calculateAutoMiningRate = function () {
  let rate = 0;
  this.machines.forEach(m => {
    if (m.active) rate += m.productionRate;
  });
  return rate;
};

// Regenerate energy
userSchema.methods.regenerateEnergy = function () {
  const now = Date.now();
  const elapsed = (now - this.lastEnergyUpdate) / 1000; // seconds
  const regenerated = Math.floor(elapsed * 3); // 3 energy per second
  this.energy = Math.min(this.maxEnergy, this.energy + regenerated);
  this.lastEnergyUpdate = now;
  return this.energy;
};

// Calculate offline earnings
userSchema.methods.calculateOfflineEarnings = function () {
  const now = Date.now();
  const lastActive = this.lastActive.getTime();
  const maxOfflineMs = 3 * 60 * 60 * 1000; // 3 hours
  const offlineMs = Math.min(now - lastActive, maxOfflineMs);
  const offlineMinutes = offlineMs / 60000;
  const rate = this.calculateAutoMiningRate();
  return Math.floor(rate * offlineMinutes);
};

module.exports = mongoose.model('User', userSchema);
