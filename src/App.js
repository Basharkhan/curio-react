// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import { Home } from './pages/public/Home';
import { Layout } from './components/common/Layout';

// Simple home component for now
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (    
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />      
      
      {/* protected routes */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </>
      )}

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <ProtectedRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;