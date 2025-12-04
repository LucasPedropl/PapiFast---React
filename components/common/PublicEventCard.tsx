import React from 'react';

export interface PublicEventData {
  id: number;
  title: string;
  category: string;
  date: string; // "07 nov. 2025"
  time: string; // "15:54"
  imageUrl?: string;
  imagePlaceholder?: boolean; // For the gray "Imagem" placeholders
}

interface PublicEventCardProps {
  event: PublicEventData;
}

export const PublicEventCard: React.FC<PublicEventCardProps> = ({ event }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400 font-bold text-2xl tracking-tight">
             {event.imagePlaceholder ? 'Imagem' : <i className="fa-solid fa-image text-4xl opacity-50"></i>}
          </div>
        )}
        
        {/* Category Badge - Overlay bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-orange-50/95 backdrop-blur-sm text-brand-darkYellow px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-sm border border-orange-100">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-orange transition-colors leading-snug">
          {event.title}
        </h3>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500 font-medium">
          <i className="fa-regular fa-calendar text-gray-400 mr-2"></i>
          <span>{event.date} às {event.time}</span>
        </div>
      </div>
    </div>
  );
};