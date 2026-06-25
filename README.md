# 🚀 LocalLance

A campus-focused AI-powered freelance marketplace for college students.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](locallancefrontend-jgvacwlwc-mannyas-projects.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue)](https://locallance-backend.onrender.com)

## 🌐 Live Demo
**Frontend:** locallancefrontend-jgvacwlwc-mannyas-projects.vercel.app
**Backend API:** https://locallance-backend.onrender.com/docs

> ⚠️ First load may take 30 seconds — free tier spins down when idle.

## 📸 Screenshots
### Home Page
<img width="1913" height="781" alt="image" src="https://github.com/user-attachments/assets/707552ab-b369-417b-ba01-52ff90ae1d07" />
### Dashboard
<img width="1909" height="906" alt="image" src="https://github.com/user-attachments/assets/dea5f799-a03a-4076-a373-af896c5e65bc" />
### Browse gigs
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/1c9f2267-3f2a-43c9-ae96-0255a068b3b9" />

---

## 📌 Features

### 👤 User Authentication

* User Registration
* Secure Login
* Logout
* Forgot Password Support

### 💼 Gig Management

* Post New Gigs
* Edit Existing Gigs
* Delete Gigs
* Browse Available Gigs
* Search by Title or Category
* Gig Status Tracking

  * Open
  * In Progress
  * Completed

### 📝 Application System

* Apply to Gigs
* Proposal Submission
* Quote and Delivery Time Selection
* Portfolio Links

### 🤖 AI Applicant Ranking

* Rank applicants based on:

  * Proposal Quality
  * Relevance to Gig
  * Pricing
* AI Recommendation Badge
* AI Hiring Suggestions

### ✅ Hiring Workflow

* Accept Applicants
* Reject Applicants
* Automatic Rejection of Remaining Applicants
* Feedback Generation
* Applicant Notifications

### 📊 Dashboard

* Gigs Posted
* Active Gigs
* Completed Projects
* Applications Sent
* Recent Activity

### 📞 Client Contact Sharing

* Accepted applicants can view client details directly from dashboard

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* SQLite

### AI Layer

* Gemini API / LLM Integration
* AI-based Applicant Ranking

---

## 📂 Project Structure

```bash
LocalLance/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.jsx
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
│
└── README.md
```

## ⚙️ Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Workflow

1. User registers and logs in.
2. Employers post gigs.
3. Freelancers browse and apply.
4. AI ranks applicants.
5. Employer selects candidate.
6. Remaining applicants are automatically rejected.
7. Accepted applicant receives client details.
8. Gig moves to "In Progress".

---

## 🔥 Future Improvements

* Real-time Messaging
* Payment Integration
* AI Proposal Scoring
* Resume Parsing
* Email Notifications
* AI Gig Recommendations
* Rating & Review System

---

## 👨‍💻 Author

**Mannya** — 4th year CS student at Thapar Institute of Engineering & Technology  
Built as a full-stack AI-powered project using React, FastAPI, and Generative AI.
