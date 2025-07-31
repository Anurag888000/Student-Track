import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const initialFormState = {
  title: "",
  description: "",
  instructor: "",
  duration: "",
};

const AddCourseForm = ({ onCourseAdded }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field.trim() === "")) {
      setMessage({ text: "All fields are required.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.post(`${API_URL}/api/courses`, formData);
      setMessage({ text: "✅ Course added successfully!", type: "success" });
      setFormData(initialFormState);
      if (onCourseAdded) onCourseAdded();
    } catch (err) {
      setMessage({ text: "❌ Failed to add course.", type: "error" });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-sm mx-auto bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">
          Add New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <LabelInput
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Full Stack Web Development"
          />
          <LabelInput
            label="Instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="e.g., Rajesh Kumar"
          />
          <LabelInput
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 6 Weeks"
          />
          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course overview..."
              rows="2"
              className="w-full p-2 rounded bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-slate-300"
          >
            {isSubmitting ? "Adding..." : "Add Course"}
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-3 text-center text-sm rounded p-2 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable labeled input field
const LabelInput = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 font-medium text-slate-700">{label}</label>
    <input
      type="text"
      {...props}
      className="w-full p-2 rounded bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

LabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

AddCourseForm.propTypes = {
  onCourseAdded: PropTypes.func.isRequired,
};

export default AddCourseForm;
