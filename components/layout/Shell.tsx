import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Shell: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage to remember user preference
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true'; // Returns true if 'true', false otherwise (including null)
  });

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Persist sidebar state whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-gray-800 relative selection:bg-brand-orange selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white rounded-full blur-[150px] pointer-events-none opacity-60 z-0"></div>

      <Sidebar 
        isCollapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Modern Header - Simple & Clean */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 z-20">
          <div className="flex items-center gap-4">
             {/* Only visible on Desktop now */}
             <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-gray-900 transition-all"
             >
                <i className={`fa-solid fa-bars-staggered text-lg transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}></i>
             </button>
             
             {/* Mobile Logo (Visible only on mobile/tablet) */}
             <div className="md:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-deepOrange flex items-center justify-center text-white shadow-md">
                   <span className="font-bold font-cursive">P</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">PapiFast</span>
             </div>
          </div>

          <div className="flex items-center space-x-6">
             <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-orange bg-white shadow-sm border border-gray-200 hover:border-brand-orange/30 transition-all">
                <i className="fa-regular fa-bell text-lg"></i>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-deepOrange rounded-full border-2 border-white"></span>
             </button>
             
             {/* Profile Dropdown */}
             <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 pl-6 border-l border-gray-300 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900 leading-tight">{user?.nome.split(' ')[0]}</p>
                    <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">{user?.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-900 shadow-md flex items-center justify-center text-white overflow-hidden border-2 border-white ring-1 ring-gray-200">
                      <span className="font-bold text-sm">{user?.nome.charAt(0)}</span>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 animate-fade-in-up transform origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                       <p className="text-sm font-bold text-gray-900 leading-tight">{user?.nome}</p>
                       <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.role}</p>
                    </div>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 group"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket group-hover:text-red-700"></i>
                      Sair da Conta
                    </button>
                  </div>
                )}
             </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-24 md:pb-10 scroll-smooth no-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};