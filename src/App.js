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
import { CategoryList } from './pages/dashboard/admin/categories/CategoryList';
import { PostList } from './pages/dashboard/admin/posts/PostList';

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
              <Route 
                path="/admin/posts"
                element={
                  <PtotectedRoute requireAdmin={true}>
                    <PostList />
                  </PtotectedRoute>
                }
              />              
              <Route 
                path="/admin/categories"
                element={
                  <PtotectedRoute requireAdmin={true}>
                    <CategoryList />
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