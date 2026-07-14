const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    console.log("MongoDB error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;