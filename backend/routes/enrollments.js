const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

const STUDENT_ID = process.env.STUDENT_ID || "dummyStudent123";

// GET /api/enrollments/me - Retrieve enrollments for the current student
router.get("/me", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: STUDENT_ID });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/enrollments - Create a new enrollment
router.post("/", async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      courseId,
      studentId: STUDENT_ID,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    const newEnrollment = new Enrollment({
      courseId,
      studentId: STUDENT_ID,
    });

    const savedEnrollment = await newEnrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
