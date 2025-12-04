import React, { ReactNode } from 'react';

interface FilterSectionProps {
  title?: string;
  icon?: string;
  children: ReactNode;
  onClear?: () => void;
  headerAction?: ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ 
  title = "Filtros e Pesquisa", 
  icon = "fa-filter",
  children, 
  onClear,
  headerAction
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-brand-orange">
             <i className={`fa-solid ${icon} text-sm`}></i>
          </div>
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{title}</h3>
        </div>
        {headerAction && (
          <div>{headerAction}</div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {children}
        {onClear && (
           <button 
             onClick={onClear}
             className="w-full lg:w-auto px-6 py-2.5 rounded-xl border border-gray-300 text-gray-500 font-bold text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all whitespace-nowrap flex items-center justify-center gap-2"
           >
             <i className="fa-solid fa-times"></i>
             Limpar Filtros
           </button>
        )}
      </div>
    </div>
  );
};