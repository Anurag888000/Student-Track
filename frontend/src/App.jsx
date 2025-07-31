import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import CourseList from "./components/CourseList";
import AddCourseForm from "./components/AddCourseForm"; // ⭐ Import new component
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // ⭐ State is now managed in the App component
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⭐ useCallback ensures the function isn't recreated on every render
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [coursesResponse, enrollmentsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/courses`),
        axios.get(`${API_URL}/api/enrollments/me`),
      ]);

      setCourses(coursesResponse.data);
      const enrolledIds = new Set(
        enrollmentsResponse.data.map((e) => e.courseId)
      );
      setEnrolledCourses(enrolledIds);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">

      {/* ⭐ Add the new form component */}
      <AddCourseForm onCourseAdded={fetchData} />

      {/* ⭐ Pass state and data down to CourseList as props */}
      <CourseList
        courses={courses}
        enrolledCourses={enrolledCourses}
        setEnrolledCourses={setEnrolledCourses}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
