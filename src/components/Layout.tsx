import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane as Plant, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/utils';

interface LayoutProps {
  children: React.ReactNode;
  navItems: { path: string; label: string; icon: React.ReactNode }[];
}

const Layout: React.FC<LayoutProps> = ({ children, navItems }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, login, logout } = useAuth();

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <Plant className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-primary-800">SoilGPT Lite</span>
          </Link>
          <button 
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 rounded-md px-3 py-2 transition-colors",
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full border-t p-4">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-neutral-700">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-xs text-neutral-500 hover:text-neutral-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => login('Demo User')} 
              className="w-full rounded-md bg-primary-600 py-2 text-white hover:bg-primary-700"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              className="text-neutral-500 hover:text-neutral-700 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-medium text-neutral-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'SoilGPT Lite'}
              </h1>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-neutral-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;