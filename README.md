# AI Resume Analyzer

A powerful MERN Stack application that uses AI to analyze resumes against job descriptions. It provides a match score, professional summary, strengths, weaknesses, and actionable improvements to help users land their dream jobs.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Powered By](https://img.shields.io/badge/AI-Powered-purple)

## 🚀 Features

-   **PDF Resume Upload**: Securely upload and parse PDF resumes.
-   **AI Analysis**: Instant detailed feedback on how well a resume matches a specific job description.
    -   Match Score (0-100%)
    -   Professional Summary
    -   Key Strengths & Weaknesses
    -   Missing Skills Calculation
    -   Recommended Improvements
-   **History Tracking**: Saves all past analyses for easy access later.
-   **Admin Dashboard**: View usage analytics like total resumes processed and average scores.
-   **Modern UI**: Built with React, featuring glassmorphism design, smooth animations, and responsive layout.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), CSS3, Framer Motion, Lucide React (Icons), React Router.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose).
-   **AI Integration**: Groq (Llama 3), OpenAI, or Google Gemini.
-   **Tools**: Multer (File Upload), PDF-Parse.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
-   Node.js installed.
-   MongoDB installed and running locally (or a MongoDB Atlas URI).
-   An API Key from [Groq](https://console.groq.com) (Recommended, Free), OpenAI, or Google AI Studio.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd "Resume _Analyzer"
```

### 3. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

**Configuration:**
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-analyzer
# Choose ONE of the following API keys:
GROQ_API_KEY=your_groq_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here
# GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd client
npm install
```

**Configuration:**
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🏃‍♂️ Running the Project

You need to run the **Backend** and **Frontend** in two separate terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
*You should see: "Server running on port 5000" and "MongoDB Connected"*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
*Click the link shown (usually http://localhost:5173) to open the app.*

---

## 🔧 Troubleshooting

-   **Mock Mode Warning**: If the server logs say "Switching to MOCK MODE", it means your API Key is invalid, missing, or the service is down. The app will still work with simulated data.
-   **MongoDB Error**: Ensure your local MongoDB service is running, or check if your `MONGO_URI` is correct.
-   **Upload Failed**: Ensure the file is a PDF.

## 📝 License
This project is open-source and available for educational purposes.
