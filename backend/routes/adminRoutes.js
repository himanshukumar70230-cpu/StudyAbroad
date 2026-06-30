const express = require("express");

const {
  createAdmin,
  loginAdmin,
  getAllStudents,
  updateStudentStatus,
  deleteStudent
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);

router.get("/students", protect, adminOnly, getAllStudents);
router.put("/students/:id/status", protect, adminOnly, updateStudentStatus);
router.delete("/students/:id", protect, adminOnly, deleteStudent);

module.exports = router;