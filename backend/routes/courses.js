const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET /api/courses - Retrieve all courses (existing code)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ⭐ NEW: POST /api/courses - Create a new course
router.post("/", async (req, res) => {
  const { title, description, instructor, duration } = req.body;

  // Basic validation
  if (!title || !description || !instructor || !duration) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse); // 201 Created
  } catch (err) {
    res.status(500).json({ message: "Server error while creating course" });
  }
});

module.exports = router;
