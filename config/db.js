import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB ✅");
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

export default connectDB;
