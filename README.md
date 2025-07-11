# 💰 Expense Tracker Dashboard

A modern, full-featured web application for tracking both personal and business expenses. Built with **React**, **Firebase**, and **Tailwind CSS**, this project offers authentication, email verification, monthly budgeting, and real-time data sync. Designed for speed, clarity, and usability on all devices.

---

## 🌐 Live Demo

🔗 [Live Site](https://expense-tracker-dashboar-7ca0c.web.app/)  
📁 [Source Code](https://github.com/MantasKukulskis/expense-tracker-dashboard)

---

## 🎯 Features

- ✅ Firebase Authentication (register/login)
- ✅ Email verification + auto-redirect
- ✅ Password reset via email
- ✅ Add/edit/delete transactions (personal & business)
- ✅ Custom categories: food, fuel, entertainment, income, expenses
- ✅ Set monthly budget & track balance in real time
- ✅ Filter by month, date range, or keyword
- ✅ Real-time Firestore data sync
- ✅ Summary cards + pie chart visualization
- ✅ Input validation with custom error messages
- ✅ Responsive layout (mobile & desktop)
- ✅ Modular and reusable React components

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Firebase (Firestore, Auth)
- **Build Tool:** Vite
- **Hosting:** Firebase Hosting

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org)
- [Git](https://git-scm.com)
- A [Firebase project](https://console.firebase.google.com)

### Installation

```bash
git clone https://github.com/MantasKukulskis/expense-tracker-dashboard.git
cd expense-tracker-dashboard
npm install
npm run dev

Then open http://localhost:5173
🔐 Firebase Setup

    Create a Firebase project

    Enable Email/Password Authentication

    Create a Firestore database

    Add Firebase config to src/firebase.js:

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  ...
};

(Optional) Add serviceAccountKey.json if using Admin SDK (for future automation or clean-up tools)
🧪 Testing

Automated testing not yet implemented.
Manual QA is recommended to verify input validation, filtering, and budget logic.
👨‍💻 Author

Mantas Kukulskis
📎 https://github.com/MantasKukulskis
⚠️ License

Licensed under the MIT License
📚 References

    React Documentation

    Tailwind CSS

    Firebase Docs

    Vite