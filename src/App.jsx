import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { Home } from './routes/Home';
import { BusinessDashboardPage } from './routes/BusinessDashboard';
import { PersonalDashboardPage } from './routes/PersonalDashboard';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyEmail from './components/auth/VerifyEmail';

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const isVerified = currentUser?.emailVerified;

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
      ) : !isVerified ? (
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