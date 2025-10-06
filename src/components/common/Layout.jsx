import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Sidebar from "./Sidebar";

export const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
     <div className="d-flex flex-grow-1">
        {/* Show sidebar only when authenticated */}
        {isAuthenticated() && (
          <aside className="flex-shrink-0">
            <Sidebar />
          </aside>            
        )}
        
        {/* Main content */}
        <main className="flex-grow-1 p-3">
          {children}
        </main>
      </div>
    </div>
  );
};

