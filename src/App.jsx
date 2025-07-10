import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';

import { Home } from './routes/Home';
import { BusinessDashboardPage } from './routes/BusinessDashboard';
import { PersonalDashboardPage } from './routes/PersonalDashboard';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyEmail from './components/auth/VerifyEmail';

export default function App() {
  const { currentUser, loading } = useAuth();
  const [verified, setVerified] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser) {
        await currentUser.reload();
        const isVerified = currentUser.emailVerified;
        setVerified(isVerified);

        // Jei vartotojas patvirtino el. paštą, aktyviai nukreipiam
        if (isVerified && window.location.pathname === '/verify-email') {
          navigate('/');
        }
      } else {
        setVerified(false);
      }
    };

    checkVerification();
  }, [currentUser, navigate]);

  if (loading || verified === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Routes>
      {!currentUser ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : !verified ? (
        <>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<Navigate to="/verify-email" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<BusinessDashboardPage user={currentUser} />} />
          <Route path="/personal" element={<PersonalDashboardPage user={currentUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}