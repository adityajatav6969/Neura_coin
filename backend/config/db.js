const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://neura_admin:Adityaj696969@ac-c7rsxrq.lnlykl1.mongodb.net/neura_coin?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Removed process.exit(1) so Render deploys don't fail immediately, allowing us to read logs.
  }
};

module.exports = connectDB;
