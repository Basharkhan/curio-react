import React from 'react'
import { Header } from './Header'
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     <div className="flex flex-1">
        {/* Show sidebar only when authenticated */}
        {isAuthenticated() && <Sidebar />}
        
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

