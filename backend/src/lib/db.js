import dotnev from 'dotenv';
import mongoose from 'mongoose';

dotnev.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectado con MongoDB ${conn.connection.host}`);
  } catch(error) {
    console.error('Fallo al conectarse con MongoDB', error);
    process.exit(1);
  }
}