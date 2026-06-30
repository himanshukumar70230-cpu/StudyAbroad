const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Default admin created");
  } catch (error) {
    console.log("Admin creation error:", error.message);
  }
};

module.exports = createDefaultAdmin;