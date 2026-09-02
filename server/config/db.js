import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  const uri = process.env.MONGO_URI;
  if (!uri && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/portfolio_db', {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB database (${error.message}).`);
    return false;
  }
};

export const getDBStatus = () => {
  const isConn = mongoose.connection.readyState === 1;
  return {
    isConnected: isConn,
    readyState: mongoose.connection.readyState,
    state: isConn ? 'Connected' : 'Disconnected',
    host: mongoose.connection.host || 'Disconnected',
    name: mongoose.connection.name || 'portfolio_db'
  };
};
