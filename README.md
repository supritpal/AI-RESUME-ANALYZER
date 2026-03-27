# 🚀 AI Resume Analyzer

An AI-powered full-stack web application that analyzes resumes against job descriptions and provides ATS score, skill match, and improvement tips.

---

## 🌐 Live Demo

* 🔗 Frontend: https://your-vercel-link.vercel.app
* 🔗 Backend: https://your-render-link.onrender.com

---

## ✨ Features

* 📄 Upload Resume (PDF)
* 🧠 AI-based Resume Analysis (HuggingFace)
* 📊 ATS Score Calculation
* ✅ Matched Skills Detection
* ❌ Missing Skills Identification
* 💡 Personalized Improvement Tips
* 🔐 User Authentication (JWT)
* ☁️ Cloud Storage (Cloudinary)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Axios
* CSS (Glassmorphism UI)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### AI & Services

* HuggingFace Inference API
* Cloudinary (File Storage)

---

## 📁 Project Structure

```
AI-RESUME-ANALYZER/
│
├── resume/
│   ├── client/        # Frontend (React)
│   ├── server/        # Backend (Node.js)
│   └── ai-services/   # AI microservice (optional)
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/AI-RESUME-ANALYZER.git
cd AI-RESUME-ANALYZER
```

---

### 2️⃣ Setup Backend

```
cd resume/server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url
HF_API_KEY=your_huggingface_key
```

Run server:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd ../client
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:3000
```

Run frontend:

```
npm run dev
```

---

## 🚀 Deployment

### Backend (Render)

* Root Directory: `resume/server`

### Frontend (Vercel)

* Root Directory: `resume/client`
* Add Environment Variable:

```
VITE_API_URL=https://your-backend-url
```

---

## 📊 How It Works

1. User uploads resume (PDF)
2. Resume text is extracted
3. Skills are detected from resume
4. Job description is analyzed
5. AI computes similarity score
6. Final ATS score is generated
7. Suggestions are provided

---

## 🔥 Future Improvements

* 📈 Resume history dashboard
* 📥 Download analyzed report (PDF)
* 🎯 Role-based recommendations
* 🤖 Better AI semantic matching

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 👨‍💻 Author

**Suprit Pal**

* GitHub: https://github.com/supritpal

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
