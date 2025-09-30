import React from 'react'
import { Header } from './Header'

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

