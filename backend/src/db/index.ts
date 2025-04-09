import mongoose from "mongoose";
import { DB_NAME } from "../utils/containts";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection faild", error);
    process.exit(1);
  }
};

export {connectDB};