import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const Dashboard: React.FC = () => {
  const { user, filial, switchFilial } = useAuth();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', weekday: 'long' };
    setCurrentDate(now.toLocaleDateString('pt-BR', options));
  }, []);

  // Mock data for mini charts
  const data = [
    { name: 'S', val: 400 }, { name: 'T', val: 300 }, { name: 'Q', val: 600 },
    { name: 'Q', val: 800 }, { name: 'S', val: 500 }, { name: 'S', val: 900 }, { name: 'D', val: 700 }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
           <p className="text-gray-500 mt-2 flex items-center gap-2 font-medium">
             <i className="fa-regular fa-calendar text-brand-orange"></i> {currentDate}
           </p>
        </div>
        
        {/* Branch Filter - Darker Border */}
        <div className="flex items-center bg-white rounded-full shadow-lg shadow-gray-100 border border-gray-300 px-1 py-1">
           <div className="px-5 py-2.5 text-sm font-bold text-gray-500 border-r border-gray-300 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
             Filial
           </div>
           <select 
             className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-800 cursor-pointer py-2.5 pl-4 pr-10 rounded-full hover:bg-gray-50 transition-colors outline-none"
             value={filial?.id || ''}
             onChange={(e) => switchFilial(Number(e.target.value))}
           >
             <option value="1">Matriz São Paulo</option>
             <option value="2">Filial Rio</option>
             <option value="0">Todas as Filiais</option>
           </select>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-darkYellow to-brand-deepOrange p-8 md:p-12 shadow-2xl shadow-brand-orange/30 text-white border-2 border-brand-orange/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold mb-4 border border-white/10 shadow-sm">
                <i className="fa-solid fa-star text-[10px]"></i> Admin Panel v2.0
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Olá, {user?.nome.split(' ')[0]}!
              </h2>
              <p className="text-orange-100 text-lg mb-8 max-w-md">
                Suas campanhas tiveram um aumento de <strong className="text-white">+24%</strong> nesta semana.
              </p>
              <button className="bg-white text-brand-deepOrange px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-black/10 hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center gap-2 border border-gray-200">
                Ver Relatórios <i className="fa-solid fa-arrow-right"></i>
              </button>
           </div>
           
           {/* Decorative Elements */}
           <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden rounded-r-[2rem]">
              <i className="fa-solid fa-chart-pie absolute -right-10 -bottom-20 text-[300px] text-white/10 rotate-12"></i>
           </div>
        </div>
      </div>

      {/* Metrics Grid - Darker Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Vendas Hoje', val: 'R$ 1.250,75', inc: '+15%', icon: 'fa-dollar-sign', color: 'text-green-600', bg: 'bg-green-100/50', border: 'border-green-500' },
          { label: 'Cupons Ativos', val: '86', inc: '25 usados', icon: 'fa-ticket', color: 'text-brand-orange', bg: 'bg-orange-100/50', border: 'border-brand-orange' },
          { label: 'Novos Clientes', val: '12', inc: '+5%', icon: 'fa-users', color: 'text-blue-600', bg: 'bg-blue-100/50', border: 'border-blue-500' },
          { label: 'Próximo Evento', val: 'Show Acústico', inc: 'Em 3 dias', icon: 'fa-calendar-day', color: 'text-purple-600', bg: 'bg-purple-100/50', border: 'border-purple-500' },
        ].map((item, idx) => (
          <div key={idx} className={`relative bg-white p-6 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-300 flex flex-col justify-between h-44 overflow-hidden group`}>
            {/* Left Border Accent */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.bg.replace('/50', '')}`}></div>

            <div className="flex justify-between items-start z-10">
               <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-black/5`}>
                 <i className={`fa-solid ${item.icon}`}></i>
               </div>
               <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg ${item.bg} ${item.color} border border-black/5`}>{item.inc}</span>
            </div>
            <div className="z-10 mt-4">
               <h3 className="text-3xl font-bold text-gray-900 tracking-tight truncate">{item.val}</h3>
               <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Chart Section - Darker Border */}
         <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-300">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-8 bg-brand-orange rounded-full"></div>
                 <h3 className="text-xl font-bold text-gray-900">Visão Geral de Vendas</h3>
               </div>
               <div className="flex bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                  <button className="px-5 py-2 rounded-lg bg-white text-xs font-bold shadow-sm text-brand-deepOrange border border-gray-200">Semana</button>
                  <button className="px-5 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Mês</button>
               </div>
            </div>
            
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#FF9800" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#FF9800" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12, fontWeight: 600}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12, fontWeight: 600}} />
                   <Tooltip 
                     contentStyle={{borderRadius: '16px', border: '1px solid #d1d5db', boxShadow: '0 10px 30px -10px rgba(255, 152, 0, 0.3)', padding: '12px 20px'}}
                     itemStyle={{color: '#EA580C', fontWeight: 'bold'}}
                     cursor={{stroke: '#FDBA74', strokeWidth: 2, strokeDasharray: '5 5'}}
                   />
                   <Area type="monotone" dataKey="val" stroke="#FF9800" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" activeDot={{r: 8, strokeWidth: 4, stroke: '#fff', fill: '#FF9800'}} />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Top Products - Darker Border */}
         <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-300">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
               <i className="fa-solid fa-crown text-brand-yellow"></i> Mais Vendidos
            </h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-lightYellow to-brand-yellow flex items-center justify-center text-brand-darkYellow font-bold text-xl shadow-sm border border-brand-yellow/30">
                      #{i}
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">Combo Master {i}</h4>
                      <p className="text-xs text-gray-400 font-medium">142 vendas esta semana</p>
                   </div>
                   <div className="text-right">
                      <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200">R$ 49</span>
                   </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 rounded-xl border-2 border-dashed border-gray-300 text-sm font-bold text-gray-500 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
              <i className="fa-solid fa-plus"></i> Ver Catálogo Completo
            </button>
         </div>
      </div>
    </div>
  );
};