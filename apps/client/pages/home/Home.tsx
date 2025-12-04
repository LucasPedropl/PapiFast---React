import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState({ day: '01', month: 'Janeiro', year: '2024' });

  useEffect(() => {
    const now = new Date();
    setCurrentDate({
      day: now.getDate().toString().padStart(2, '0'),
      month: now.toLocaleDateString('pt-BR', { month: 'long' }),
      year: now.getFullYear().toString()
    });
  }, []);

  // Mock Data for upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Sexta-Feira Country', date: '04', month: 'DEZ', time: '16:36', location: 'Arena Principal', image: 'fa-guitar' },
    { id: 2, title: 'Festival de Verão', date: '04', month: 'DEZ', time: '17:24', location: 'Espaço Garden', image: 'fa-sun' },
    { id: 3, title: 'Noite de Gala', date: '12', month: 'DEZ', time: '20:00', location: 'Salão Nobre', image: 'fa-champagne-glasses' },
  ];

  const quickAccess = [
    { 
      label: 'Meus Convites', 
      desc: 'Veja e responda aos convites recebidos.', 
      icon: 'fa-envelope', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      path: '/app/convites' 
    },
    { 
      label: 'Meus Eventos', 
      desc: 'Crie e gerencie seus próprios eventos.', 
      icon: 'fa-calendar-check', 
      color: 'text-green-600', 
      bg: 'bg-green-50', 
      path: '/app/eventos/meus' 
    },
    { 
      label: 'Meus Cupons', 
      desc: 'Confira os descontos que você ganhou.', 
      icon: 'fa-ticket', 
      color: 'text-brand-orange', 
      bg: 'bg-orange-50', 
      path: '/app/cupons/meus' 
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 md:pb-0">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-orange to-brand-darkYellow p-8 md:p-10 shadow-xl shadow-brand-orange/20 text-white">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-brand-yellow opacity-20 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
              Olá, {user?.nome.split(' ')[0]}!
            </h1>
            <p className="text-orange-100 text-sm md:text-base max-w-md font-medium">
              Seja bem-vindo de volta à sua área. Aqui você pode gerenciar seus convites, eventos e muito mais.
            </p>
          </div>

          {/* Date Widget */}
          <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[140px] shadow-lg">
            <span className="text-4xl font-bold text-white leading-none">{currentDate.day}</span>
            <span className="text-xs uppercase tracking-widest font-bold text-orange-50 mt-1">{currentDate.month}</span>
            <span className="text-[10px] text-orange-100/80">{currentDate.year}</span>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickAccess.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(item.path)}
              className="group bg-white p-6 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100 hover:border-brand-lightYellow transition-all duration-300 cursor-pointer flex flex-col items-center text-center md:items-start md:text-left hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-orange transition-colors">{item.label}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-bold text-gray-800">Próximos Eventos</h2>
          <button 
            onClick={() => navigate('/app/eventos/todos')}
            className="text-sm font-bold text-brand-orange hover:text-brand-darkYellow transition-colors flex items-center gap-1"
          >
            Ver todos <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 group"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-orange-50 rounded-xl text-brand-orange border border-orange-100/50 flex-shrink-0">
                <span className="text-xl font-bold leading-none">{event.date}</span>
                <span className="text-[10px] font-bold uppercase mt-0.5">{event.month}</span>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-brand-orange transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <i className="fa-regular fa-clock text-gray-400"></i> {event.time}
                  </span>
                  {event.location && (
                    <span className="hidden sm:flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-gray-400"></i> {event.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button className="hidden sm:block px-4 py-2 rounded-lg text-xs font-bold text-brand-orange border border-brand-orange/20 hover:bg-brand-orange hover:text-white transition-all whitespace-nowrap">
                Ver Detalhes
              </button>
              <button className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-orange hover:bg-orange-50 transition-colors">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          ))}

          {/* Empty State visual helper (if list were empty in real app) */}
          {upcomingEvents.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
              <i className="fa-regular fa-calendar-xmark text-3xl text-gray-300 mb-3"></i>
              <p className="text-gray-500 text-sm font-medium">Nenhum evento próximo agendado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};