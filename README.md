# 🚀 LocalLance

A campus-focused freelance marketplace that connects students with local opportunities. Users can post gigs, apply for projects, rank applicants using AI, manage applications, and collaborate efficiently.

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

**Mannya**

Built as a full-stack AI-powered freelance marketplace project using React, FastAPI, SQLite, and Generative AI.
