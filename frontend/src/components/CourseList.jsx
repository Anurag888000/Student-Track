import React from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

const CourseList = ({
  courses,
  enrolledCourses,
  setEnrolledCourses,
  loading,
  error,
}) => {
  const handleEnrollSuccess = (courseId) => {
    setEnrolledCourses((prev) => new Set([...prev, courseId]));
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={enrolledCourses.has(course._id)}
              onEnrollSuccess={handleEnrollSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  enrolledCourses: PropTypes.instanceOf(Set).isRequired,
  setEnrolledCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CourseList;
