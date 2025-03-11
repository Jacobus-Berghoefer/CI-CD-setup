import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';

// Connect to MongoDB
mongoose.connect(MONGO_URI);

const db = mongoose.connection;

// Log successful connection
db.once('open', () => {
  console.log('✅ MongoDB connection established:', MONGO_URI);
});

// Log errors
db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

export default db;
