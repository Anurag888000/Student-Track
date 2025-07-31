import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const CourseCard = ({ course, isEnrolled, onEnrollSuccess }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await axios.post(`${API_URL}/api/enrollments`, { courseId: course._id });
      onEnrollSuccess(course._id);
    } catch (err) {
      alert("Enrollment failed. Please try again.");
      console.error("Enrollment error:", err);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="border-t-4 border-blue-400 p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{course.description}</p>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200">
        <div className="flex items-center text-sm text-slate-600 mb-4">
          <span className="mr-2">🧑‍🏫</span>
          <strong>Instructor:</strong>
          <span className="ml-2">{course.instructor}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600 mb-6">
          <span className="mr-2">🕒</span>
          <strong>Duration:</strong>
          <span className="ml-2">{course.duration}</span>
        </div>

        <button
          onClick={handleEnroll}
          disabled={isEnrolled || isEnrolling}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isEnrolled
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-slate-300"
          }`}
        >
          {isEnrolled
            ? "✓ Enrolled"
            : isEnrolling
            ? "Enrolling..."
            : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  isEnrolled: PropTypes.bool.isRequired,
  onEnrollSuccess: PropTypes.func.isRequired,
};

export default CourseCard;
