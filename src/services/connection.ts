import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MongoDB URI not defined in .env file");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
}
