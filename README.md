# 🎓 Student Course Track

A full-stack student course tracking platform where users can browse, enroll in, and manage courses. Built using the MERN stack with modern UI and authentication.

## 🌐 Live Demo

- 🔸 Frontend (Netlify): [student-course-track.netlify.app](https://student-course-track.netlify.app/)
- 🔸 Backend (Render): [student-track-vrfb.onrender.com](https://student-track-vrfb.onrender.com/)

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS, dotenv

---

## 🚀 Features

- 🔍 View all available courses
- ✅ Enroll in courses
- ➕ Add new courses (admin feature)
- 🧠 State management using React hooks
- 📦 RESTful API integration
- 📱 Responsive design (Tailwind)

---

## 🧑‍💻 Local Setup

### 1️⃣ Clone the Repositories

```bash
git clone https://github.com/Anurag888000/Student-Track.git
---

## 🔧 Set Up Backend

```bash
# Clone the backend repository
git clone https://github.com/Anurag888000/Student-Track.git
cd student-track-backend

# Install dependencies
npm install

Create a .env file in the backend root:
MONGO_URI=mongodb+srv://Anurag:Anurag@cluster0.tkomsbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
STUDENT_ID=dummyStudent123

# Start the backend server
npm run dev

# Clone the frontend repository
git clone https://github.com/Anurag888000/Student-Track.git
cd Student-Track/frontend

# Install dependencies
npm install

Create a .env file in the frontend root:
VITE_API_URL=https://student-track-vrfb.onrender.com

# Start the frontend dev server
npm run dev

