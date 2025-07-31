require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.get("/", (req, res) => {
  res.send(`
    <h2>LMS Backend API is running...</h2>
    <p>To view the frontend, click here: 
      <a href="https://student-course-track.netlify.app/" target="_blank">
        Open Student Course Tracker
      </a>
    </p>
  `);
});
app.use("/api/courses", require("./routes/courses"));
app.use("/api/enrollments", require("./routes/enrollments"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
