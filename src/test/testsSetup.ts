import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGODB_URI || "3000";
let server: any;

export const testRegDelUserDto = {
  email: "test@test.com",
  name: "Test",
  password: "test123@",
};

export const testRegDelMovieDto = {
  title: "string",
  director: "string",
  releaseDate: "01-01-1900",
};

export const setupTestEnvironment = async () => {
  if (!MONGO_DB) {
    throw new Error("MongoDB URI not defined in .env file");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_DB);

    server = app.listen(PORT || 5000);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

export const tearDownTestEnvironment = async () => {
  await mongoose.disconnect();

  server.close();
};
