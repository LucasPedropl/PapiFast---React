import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Determine items based on role
  let items = [];

  if (user.role === UserRole.ADMIN) {
    items = [
      { label: 'Home', path: '/admin/dashboard', icon: 'fa-home' },
      { label: 'Eventos', path: '/admin/eventos', icon: 'fa-calendar' },
      { label: 'Vender', path: '/admin/vender', icon: 'fa-cash-register' },
      { label: 'Menu', path: '/admin/menu', icon: 'fa-bars' },
    ];
  } else {
    // Client
    items = [
      { label: 'Home', path: '/app/home', icon: 'fa-home' },
      { label: 'Convites', path: '/app/convites', icon: 'fa-envelope' },
      { label: 'Eventos', path: '/app/eventos/meus', icon: 'fa-calendar-check' },
      { label: 'Menu', path: '/app/menu', icon: 'fa-bars' },
    ];
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // Use 'end' for Home to avoid always active, but typically NavLink 'to' matching is enough unless strict
            end={item.label === 'Home'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative
               ${isActive ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`text-xl transition-transform duration-200 ${isActive ? '-translate-y-1' : ''}`}>
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                {isActive && (
                   <span className="absolute bottom-0 w-8 h-1 bg-brand-orange rounded-t-full"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};