import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, LogOut, Home, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'SUB_ADMIN' || user?.role === 'SUB_SUB_ADMIN';

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold">CampusEvents</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} 
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
                <Link 
                  to="/login" 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;