# 💰 Expense Tracker Dashboard

## 🌟 About

A modern and feature-rich web app to track your **personal** and **business** expenses, manage budgets, and gain insights into your spending habits. Built with **React**, **Firebase**, and **Tailwind CSS**, the app ensures a smooth and responsive user experience, including **authentication**, **email verification**, and **real-time data sync**.

🔗 **Live site (deploy your own)**: _[your-firebase-url]_  
📁 **Source code**: https://github.com/MantasKukulskis/expense-tracker-dashboard

---

## 🎯 Features

- ✅ Register and login with Firebase Authentication
- ✅ Email verification system (with auto-check and redirect)
- ✅ Password reset via email
- ✅ Add, edit, and delete transactions for both **personal** and **business** categories
- ✅ Custom categories: food, fuel, entertainment, income, expenses
- ✅ Monthly budget setting and real-time tracking
- ✅ Intelligent filtering:
  - Filter by month, date range, and keyword
- ✅ Summary cards with spending breakdown
- ✅ Pie chart visualization
- ✅ Input validation with custom error messages
- ✅ Responsive layout for mobile and desktop
- ✅ Built with modular, reusable components

---

## 🚀 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Firebase (Firestore + Auth)
- **Build Tool:** Vite
- **Hosting:** Firebase Hosting (optional)

---

## 🧰 Getting Started

### 💻 Prerequisites

- Node.js – [Download](https://nodejs.org/)
- Git – [Download](https://git-scm.com/)
- A Firebase project – [Create one](https://console.firebase.google.com/)

### 📦 Install and run locally

```bash
git clone https://github.com/MantasKukulskis/expense-tracker-dashboard.git
cd expense-tracker-dashboard
npm install
npm run dev

Visit http://localhost:5173
🔐 Firebase Configuration

    Create a project in Firebase Console

    Enable Authentication (Email/Password)

    Create a Firestore database

    Add your Firebase config to firebase.js

// src/firebase.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};

    Add a serviceAccountKey.json file (if using Admin SDK for cleanup tasks)

🧪 Testing

No automated tests yet. Manual QA is recommended.
👨‍💻 Author

    Mantas Kukulskis — GitHub

⚠️ License

MIT License — see LICENSE.txt for details.
📚 References

    React Docs

    Tailwind CSS

    Firebase Docs

    Vite.js