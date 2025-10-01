// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/common/Layout';
import { Home } from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import { TagList } from './pages/dashboard/admin/tags/TagList';
import { PtotectedRoute } from './components/common/PtotectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* admin routes */}
              <Route 
                path="/admin/tags"
                element={
                  <PtotectedRoute requireAdmin={true}>
                    <TagList />
                  </PtotectedRoute>
                }
              />
          </Routes>            
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;