# PurpleMerit User Management System  
**Backend Developer Intern Assessment**

A full-stack **User Management System** built as part of the **PurpleMerit Backend Developer Intern Assessment**.  
The project demonstrates secure authentication, role-based access control, admin operations, and a modern, responsive frontend with professional UX patterns.

---

## 📌 Project Overview

This application allows users to sign up, log in, manage their profile, and securely change passwords.  
Admins can manage users through a dedicated dashboard with pagination and activation/deactivation controls.

The focus of this project is:
- Clean backend architecture
- Secure authentication & authorization
- Practical admin workflows
- Professional frontend UX

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- Jest + Supertest (Testing)

### Frontend
- React (Vite)
- Tailwind CSS (v4)
- Axios
- React Router DOM
- Context API

### Deployment
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## ✨ Features

### Authentication & Authorization
- User signup and login
- JWT-based authentication
- Secure password hashing
- Protected routes
- Role-based access control (Admin / User)

### Admin Features
- View all users in a paginated table (10 users per page)
- Activate / deactivate users
- Confirmation dialogs before actions
- Success & error notifications

### User Features
- View profile details
- Edit profile (name & email) via modal
- Change password via modal
- Save / cancel actions
- Secure password update flow

### UI / UX
- Clean black & white theme
- Responsive design (desktop & mobile)
- Loader indicators during API calls
- Toast notifications for feedback
- Blurred modal overlays for better UX

---

## 📂 Project Structure

```bash
purplemerit-user-management/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── config/
│ │ └── tests/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── services/
│ │ └── utils/
│ └── main.jsx
│
└── README.md
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_ATLAS_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
```

### Frontend (frontend/.env)

```env
VITE_API_BASE_URL=<Your backend api>
```

## 🚀 Local Setup Instructions

### 1️⃣ Clone Repository
```
git clone <YOUR_GITHUB_REPO_URL>
cd purplemerit-user-management
```

### 2️⃣ Backend Setup
```
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

## 🧪 Backend Testing
Backend unit and integration tests are included.
```bash
cd backend
npm test
```

## 📡 API Endpoints (Summary)
### Authentication

- POST /api/auth/signup

- POST /api/auth/login

### User

- GET /api/users/profile

- PATCH /api/users/profile

- PATCH /api/users/change-password

### Admin

- GET /api/users

- PATCH /api/users/:id/activate

- PATCH /api/users/:id/deactivate

All protected routes require a valid JWT token.


## 🔐 Admin Access
This application supports role-based access control.

To test admin-specific features such as user listing and activation/deactivation,
admin credentials are shared separately via email as part of the submission,
to avoid exposing sensitive data in a public repository.


## 🌐 Live Deployment
- Frontend (Vercel):https://purplemerit-user-management-fronten.vercel.app/
- Backend (Railway):https://purplemerit-user-management-backend.onrender.com/

## 👤 Author

Saras Mishra
Backend Developer Intern Candidate

- GitHub:https://github.com/Sarasmishra

- LinkedIn:https://www.linkedin.com/in/saras-mishra-dev/
