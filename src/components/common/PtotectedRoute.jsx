import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const PtotectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }    
    
    if (requireAdmin && user?.role !== 'ADMIN') {
        return <div className="p-8 text-center">Access Denied. Admin only.</div>;
    }

    return children;
}
