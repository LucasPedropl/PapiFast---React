import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NAV_ITEMS, NavItem } from '../../constants';
import { UserRole } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../common/PageHeader';

export const MenuMobilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items = NAV_ITEMS[user.role as keyof typeof NAV_ITEMS] || NAV_ITEMS[UserRole.ADMIN];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderItem = (item: NavItem) => {
    if (item.subItems) {
       return item.subItems.map(sub => (
          <Link 
            key={sub.path} 
            to={sub.path}
            className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
          >
             <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mb-2 text-lg">
                <i className={`fa-solid ${sub.icon || item.icon}`}></i>
             </div>
             <span className="text-xs font-bold text-gray-700 text-center leading-tight">{sub.label}</span>
          </Link>
       ));
    }

    return (
      <Link 
        key={item.path} 
        to={item.path}
        className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
      >
         <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mb-2 text-lg">
            <i className={`fa-solid ${item.icon}`}></i>
         </div>
         <span className="text-xs font-bold text-gray-700 text-center leading-tight">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in-up">
      <PageHeader title="Menu Completo" subtitle="Acesse todas as funcionalidades" />

      {/* User Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg flex items-center gap-4">
         <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold border-2 border-white/20">
            {user.nome.charAt(0)}
         </div>
         <div>
            <h3 className="text-lg font-bold">{user.nome}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-brand-orange text-[10px] font-bold uppercase">{user.role}</span>
         </div>
      </div>

      {/* Navigation Grid */}
      <div>
         <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 ml-1">Navegação</h3>
         <div className="grid grid-cols-3 gap-3">
            {items.map(item => {
               // If it has subitems, we might want to flatten them or show parent? 
               // For this menu, let's flatten subitems into the grid for quick access
               if (item.subItems) {
                 return item.subItems.map(sub => (
                    <Link 
                      key={sub.path} 
                      to={sub.path}
                      className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm active:scale-95 transition-transform h-28"
                    >
                       <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mb-2 text-lg">
                          <i className={`fa-solid ${sub.icon || item.icon}`}></i>
                       </div>
                       <span className="text-[11px] font-bold text-gray-700 text-center leading-tight line-clamp-2">{sub.label}</span>
                    </Link>
                 ));
               }
               return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm active:scale-95 transition-transform h-28"
                  >
                     <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mb-2 text-lg">
                        <i className={`fa-solid ${item.icon}`}></i>
                     </div>
                     <span className="text-[11px] font-bold text-gray-700 text-center leading-tight line-clamp-2">{item.label}</span>
                  </Link>
               );
            })}
         </div>
      </div>

      {/* Actions */}
      <div>
         <button 
           onClick={handleLogout}
           className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
         >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Sair da Conta
         </button>
      </div>

      <div className="text-center text-xs text-gray-400 font-medium">
         PapiFast Manager v2.0
      </div>
    </div>
  );
};