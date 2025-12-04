import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NAV_ITEMS, NavItem } from '../../constants';
import { UserRole } from '../../types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean; // Desktop collapsed state
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Flyout State for Collapsed Mode
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [hoveredTop, setHoveredTop] = useState<number>(0);
  const hoverTimeout = useRef<any>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Close context menu on global click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  
  if (!user) return null;

  const items = NAV_ITEMS[user.role as keyof typeof NAV_ITEMS] || NAV_ITEMS[UserRole.ADMIN];

  const toggleExpand = (label: string) => {
    // Prevent expanding logic if collapsed - handled by hover flyout
    if (isCollapsed) return; 

    setExpandedItems(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const isActivePath = (item: NavItem) => {
    if (item.path === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some(sub => sub.path === location.pathname);
    }
    return false;
  };

  const handleContextMenu = (e: React.MouseEvent, item: NavItem) => {
    if (item.label === 'Convites') {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleNewInvite = () => {
    navigate('/app/convites');
  };

  // --- Flyout Handlers ---
  const handleMouseEnter = (e: React.MouseEvent, item: NavItem) => {
    if (!isCollapsed) return;
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

    // Calculate position relative to the sidebar container
    const target = e.currentTarget as HTMLElement;
    const sidebar = target.closest('aside');
    if (sidebar) {
      const itemRect = target.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      // Calculate top relative to sidebar
      setHoveredTop(itemRect.top - sidebarRect.top);
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (!isCollapsed) return;
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // Small delay to allow moving mouse to the flyout
  };

  const handleFlyoutEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  const handleFlyoutLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  };

  return (
    <>
      {/* 
         SIDEBAR CONTAINER 
         Hidden on Mobile (md:flex), only visible on desktop
      */}
      <aside 
        className={`hidden md:flex flex-col z-50 transition-all duration-300 ease-in-out relative
          ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}
          h-[calc(100vh-2rem)] my-4 ml-4 rounded-[2rem]
          bg-white border border-gray-200 shadow-xl shadow-gray-200/50
          overflow-visible 
        `}
      >
        {/* Logo Section */}
        <div className={`relative h-24 flex-shrink-0 flex items-center ${isCollapsed ? 'justify-center' : 'pl-6'} transition-all duration-300 z-10`}>
           <div className="flex items-center gap-3.5 overflow-hidden">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-deepOrange flex items-center justify-center text-white shadow-lg shadow-brand-orange/30 ring-1 ring-black/5 flex-shrink-0">
                <span className="font-bold text-lg font-cursive mt-1">P</span>
             </div>
             {!isCollapsed && (
               <div className="flex flex-col animate-fade-in-up whitespace-nowrap">
                 <span className="text-xl font-bold text-gray-900 tracking-tight">PapiFast</span>
                 <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Manager</span>
               </div>
             )}
           </div>
        </div>

        {/* Navigation Content */}
        {/* 
            SCROLL FIX: overflow-y-auto ensures items stay INSIDE the container.
            no-scrollbar hides the ugly bar.
            Flyouts are handled via absolute positioning outside this div to avoid clipping.
        */}
        <div className={`flex-1 py-4 px-3 space-y-1 no-scrollbar overflow-x-hidden ${isCollapsed ? 'overflow-y-auto' : 'overflow-y-auto'}`}>
          {items.map((item) => {
            const active = isActivePath(item);
            const expanded = expandedItems.includes(item.label);
            
            return (
              <div 
                key={item.label} 
                className="group relative"
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subItems ? (
                  // Parent Item
                  <div className="relative">
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-transparent
                        ${active 
                          ? 'bg-orange-50 text-brand-orange font-bold' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
                        <i className={`fa-solid ${item.icon} ${isCollapsed ? 'text-lg' : 'text-base mr-3'} ${active ? 'text-brand-orange' : 'text-gray-400 group-hover:text-brand-orange'} transition-colors`}></i>
                        {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <i className={`fa-solid fa-chevron-right text-[10px] transition-transform duration-200 ${expanded ? 'rotate-90 text-brand-orange' : 'text-gray-300 group-hover:text-gray-400'}`}></i>
                      )}
                    </button>
                    
                    {/* Submenu for EXPANDED mode (Accordion) */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded && !isCollapsed ? 'max-h-60 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-4 pl-3 border-l border-gray-100 space-y-1">
                        {item.subItems.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            end // Ensures exact matching for sub-routes
                            className={({ isActive }) =>
                              `block px-3 py-2 text-[13px] rounded-lg transition-all font-medium truncate
                                ${isActive
                                  ? 'text-brand-orange bg-orange-50'
                                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Single Item
                  <NavLink
                    to={item.path}
                    end
                    onContextMenu={(e) => handleContextMenu(e, item)}
                    className={({ isActive }) =>
                      `relative flex items-center p-3 rounded-xl transition-all duration-200 mb-1 group border
                        ${isActive
                          ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30 border-brand-orange'
                          : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <i className={`fa-solid ${item.icon} ${isCollapsed ? 'text-lg' : 'text-base mr-3'} 
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-orange'} 
                          transition-all duration-300`}
                        ></i>
                        
                        {!isCollapsed && <span className={`text-sm truncate ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>

        {/* User Footer - Minimalist Light */}
        <div className={`p-4 mx-2 mb-2 flex-shrink-0 ${isCollapsed ? 'flex justify-center' : ''}`}>
           <button 
             onClick={logout}
             className={`flex items-center w-full rounded-xl p-3 transition-all duration-300 border border-transparent group
               ${isCollapsed ? 'justify-center hover:bg-red-50 text-gray-400 hover:text-red-500' : 'bg-gray-50 hover:bg-red-50 hover:border-red-100'}
             `}
           >
             <i className={`fa-solid fa-arrow-right-from-bracket transition-colors ${isCollapsed ? '' : 'text-gray-400 group-hover:text-red-500'}`}></i>
             {!isCollapsed && (
                <div className="ml-3 text-left overflow-hidden">
                    <p className="text-xs font-bold text-gray-700 group-hover:text-red-600">Sair</p>
                    <p className="text-[10px] text-gray-400 truncate group-hover:text-red-400/70">Encerrar sessão</p>
                </div>
             )}
           </button>
        </div>

        {/* 
            DETACHED FLYOUT MENU 
            Rendered as a direct child of 'aside' (which is overflow-visible) but positioned absolutely.
            This avoids being clipped by the scrolling 'div' above.
        */}
        {isCollapsed && hoveredItem && (
          <div 
            onMouseEnter={handleFlyoutEnter}
            onMouseLeave={handleFlyoutLeave}
            style={{ 
              top: hoveredTop, 
              left: '100%', 
              marginLeft: '12px' 
            }}
            className="absolute z-50 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 animate-fade-in-up origin-left"
          >
             <div className="px-3 py-2 border-b border-gray-100 mb-2 bg-gray-50/50 rounded-lg">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                   <i className={`fa-solid ${hoveredItem.icon} text-brand-orange`}></i>
                   {hoveredItem.label}
                </span>
             </div>
             
             {hoveredItem.subItems ? (
               <div className="space-y-1">
                 {hoveredItem.subItems.map((sub) => (
                   <NavLink
                     key={sub.path}
                     to={sub.path}
                     end
                     className={({ isActive }) =>
                       `block px-3 py-2.5 text-sm rounded-lg transition-colors font-medium
                        ${isActive
                          ? 'bg-orange-50 text-brand-orange'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                     }
                   >
                     {sub.label}
                   </NavLink>
                 ))}
               </div>
             ) : (
                <div className="px-3 py-2">
                  <span className="text-xs text-gray-400">Clique para acessar</span>
                </div>
             )}
             
             {/* Arrow pointing left */}
             <div className="absolute left-[-6px] top-6 w-3 h-3 bg-gray-50/50 rotate-45 border-l border-b border-gray-100"></div>
          </div>
        )}

      </aside>

      {/* Context Menu Portal */}
      {contextMenu && (
        <div 
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 w-48 animate-fade-in-up"
        >
          <div className="px-3 py-2 border-b border-gray-100 mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ações Rápidas</span>
          </div>
          <button 
            onClick={handleNewInvite}
            className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-plus-circle text-xs"></i>
            Cadastrar Convite
          </button>
        </div>
      )}
    </>
  );
};
