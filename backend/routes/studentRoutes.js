const express = require("express");
const {
  registerStudent,
  loginStudent,
  getStudentProfile
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", protect, getStudentProfile);

module.exports = router;