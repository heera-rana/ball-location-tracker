import 'dotenv/config'
import mongoose from 'mongoose'

async function dbConnect() {
  try {
		console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
		throw error;
  }
}

export default dbConnect;