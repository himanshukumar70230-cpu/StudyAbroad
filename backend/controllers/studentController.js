const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerStudent = async (req, res) => {
  try {
    const { name, email, phone, password, country, course, budget } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Name, email, phone and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      country,
      course,
      budget,
      role: "student"
    });

    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      role: student.role,
      token: generateToken(student._id, student.role)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({ email, role: "student" });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      role: student.role,
      token: generateToken(student._id, student.role)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStudentProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentProfile
};