import React from 'react';
import { Badge } from './Table';

export interface EventData {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  status: 'Ativo' | 'Rascunho' | 'Finalizado';
  category: string;
  type: string;
  description: string;
  imageColor: string; // fallback gradient
}

interface EventCardProps {
  event: EventData;
  onManage?: () => void;
  onTickets?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onManage, onTickets, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativo': return 'green';
      case 'Rascunho': return 'yellow';
      case 'Finalizado': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full">
      {/* Image Banner Area */}
      <div className={`h-40 ${event.imageColor} relative p-4 flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
           <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
             {event.type}
           </span>
           <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-sm shadow-sm ${
                event.status === 'Ativo' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {event.status}
              </span>
           </div>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">{event.title}</h3>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
            <i className="fa-regular fa-calendar text-brand-orange"></i>
            <span>{event.dateStart} - {event.dateEnd}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex gap-2">
             <button onClick={onManage} title="Gerenciar" className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
               <i className="fa-solid fa-list-check text-sm"></i>
             </button>
             <button onClick={onTickets} title="Ingressos" className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center">
               <i className="fa-solid fa-ticket text-sm"></i>
             </button>
          </div>
          <div className="flex gap-2">
             <button onClick={onEdit} title="Editar" className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center">
               <i className="fa-solid fa-pen text-sm"></i>
             </button>
             <button onClick={onDelete} title="Excluir" className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center">
               <i className="fa-solid fa-trash text-sm"></i>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};