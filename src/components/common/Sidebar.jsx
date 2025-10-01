import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Grid, LayoutDashboard, LogOut, PlusCircle, Tags } from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();    
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
      location.pathname === path
        ? "bg-primary text-primary-content"
        : "hover:bg-base-200"
    }`;

   const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
  };

  return (
    <div className="w-64 min-h-screen bg-base-100 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-base-300">
        <h2 className="text-xl font-bold text-primary">Curio Admin</h2>
        <div className="mt-2">
          <p className="font-medium">{user?.fullName}</p>
          <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className={linkClasses("/admin")}>
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>

          {user?.role === "ADMIN" && (
            <>
              <li>
                <Link to="/admin/tags" className={linkClasses("/admin/tags")}>
                  <Tags size={20} />
                  Manage Tags
                </Link>
              </li>
              <li>
                <Link to="/admin/posts" className={linkClasses("/admin/posts")}>
                  <FileText size={20} />
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/admin/categories" className={linkClasses("/admin/categories")}>
                  <Grid size={20} />
                  Categories
                </Link>
              </li>
            </>
          )}

          {user?.role === "AUTHOR" && (
            <>
              <li>
                <Link to="/author/posts" className={linkClasses("/author/posts")}>
                  <FileText size={20} />
                  My Posts
                </Link>
              </li>
              <li>
                <Link to="/author/posts/new" className={linkClasses("/author/posts/new")}>
                  <PlusCircle size={20} />
                  Create Post
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-base-300">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-error hover:text-error-content transition-colors text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>  
  )
}
