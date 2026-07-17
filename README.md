# 🛡️ SAFORA - Community Travel Safety Platform

SAFORA is a Full Stack MERN application that helps travelers share and access real-time safety information. The platform enables users to report unsafe locations, road blockages, accidents, weather conditions, and travel tips, creating a community-driven travel safety network.

---

## 📌 Project Overview

Travelers often face unexpected safety issues while traveling. SAFORA allows users to report incidents and view reports submitted by others, helping everyone make safer travel decisions.

This project was developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with RESTful APIs and JWT Authentication.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing
- Protected Routes

### 📍 Safety Reports
- Create Safety Reports
- View All Reports
- View Report Details
- Update Own Reports
- Delete Own Reports

### 🗺️ Location Based Reporting
- Report Unsafe Areas
- Report Road Blockages
- Report Accidents
- Report Weather Conditions
- Share Safety Tips

### 💬 Community Interaction
- Add Comments
- View Comments
- Rate Reports
- Helpful / Unhelpful Feedback

### 🛠 Admin Panel
- Manage Users
- Delete Fake Reports
- Moderate Community Content

### 📢 Alerts
- Real-Time Safety Alerts
- Safe Route Suggestions

---


# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Bootstrap
- CSS3
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

# ⚙️ Functionalities

### Authentication Module

- Register New User
- Login Existing User
- Secure JWT Authentication
- Password Encryption

---

### Report Management

Users can

- Create Reports
- Edit Reports
- Delete Reports
- View All Reports
- Search Reports
- Filter Reports

---

### Community Features

- Add Comments
- View Comments
- Rate Reports
- Helpful / Unhelpful Voting

---

### Safety Categories

- Unsafe Area
- Accident
- Road Blockage
- Weather Alert
- Safety Tip

---

### Admin Functionalities

- Manage Users
- Delete Reports
- Moderate Content
- View Community Activities

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Reports

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/reports | Get All Reports |
| GET | /api/reports/:id | Get Single Report |
| POST | /api/reports | Create Report |
| PUT | /api/reports/:id | Update Report |
| DELETE | /api/reports/:id | Delete Report |

---

## Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/reports/:id/comments | Get Comments |
| POST | /api/reports/:id/comments | Add Comment |

---

## Ratings

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/reports/:id/rate | Rate Report |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/admin/users | Get Users |
| DELETE | /api/admin/users/:id | Delete User |
| DELETE | /api/admin/reports/:id | Delete Report |

---

# 🗃 Database Models

## User

- Name
- Email
- Password
- Role
- Created At

---

## Report

- Reporter
- Title
- Type
- Description
- Location
- Status
- Created At

---

## Comment

- User
- Report
- Content
- Created At

---

## Rating

- User
- Report
- Helpful Status

---

# 🔐 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Input Validation
- Secure API Requests

---

# 📷 Screenshots

> Add screenshots of your application here.

- Home Page
- Login Page
- Dashboard
- Report Details
- Admin Panel

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/laibariaz-cs/safora.git
```

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🌟 Future Improvements

- Google Maps Integration
- Live Notifications
- Email Verification
- Image Upload
- Emergency Contacts
- AI-based Risk Prediction
- Mobile Application

---

# 👩‍💻 Developer

**Laiba Riaz**

Frontend & MERN Stack Developer

GitHub:
https://github.com/laibariaz-cs

LinkedIn:
https://www.linkedin.com/in/laiba-riaz-4806303ba

---

# 📄 License

This project is created for educational and portfolio purposes.
