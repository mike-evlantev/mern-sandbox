import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    if (process.env.NODE_ENV != "production") {
      console.log(`MongoDB connected: ${conn.connection.host}`);
    }    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}