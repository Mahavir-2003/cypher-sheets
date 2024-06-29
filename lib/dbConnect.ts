// lib/dbConnect.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect(): Promise<typeof mongoose> {
  try {
    const opts = {
      bufferCommands: false,
    };

    const connection = await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;