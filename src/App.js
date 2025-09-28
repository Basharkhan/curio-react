// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Simple home component for now
const Home = () => {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome to Curio Blog</h1>
      {user ? (
        <div>
          <p>Hello, {user.fullName} ({user.role})</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to continue</p>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;