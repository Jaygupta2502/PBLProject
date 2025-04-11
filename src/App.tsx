import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import LandingPage from './components/LandingPage';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'SUB_ADMIN' || user?.role === 'SUB_SUB_ADMIN';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated 
              ? <Navigate to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} /> 
              : <Login />
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            isAuthenticated && isAdmin 
              ? <AdminDashboard /> 
              : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/user-dashboard" 
          element={
            isAuthenticated && !isAdmin 
              ? <UserDashboard /> 
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;