import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Connected to DB`);
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting to DB", err);
    });

    await mongoose.connect(config.mongoUri as string);
  } catch (error) {
    console.log("Failed to connect to DB: ", error);
    process.exit(1);
  }
};

export default connectDB;
