import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = String(process.env.MONGO_URI);
export const connectDB = async () => {
    try {
      await mongoose.connect(mongoUri);
      console.log('Database connected');
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
      process.exit(1);
    }
  };