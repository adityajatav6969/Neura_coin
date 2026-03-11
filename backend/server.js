const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/tap', require('./routes/tap'));
app.use('/api/machine', require('./routes/machine'));
app.use('/api/upgrade', require('./routes/upgrade'));
app.use('/api/missions', require('./routes/mission'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Neura Coin server running on port ${PORT}`);
});
