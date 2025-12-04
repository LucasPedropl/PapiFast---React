import React from 'react';

interface PageContainerProps {
  title: string;
  icon: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, icon }) => (
  <div className="space-y-6 animate-fade-in-up">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
        <i className={`fa-solid ${icon} text-brand-orange text-2xl`}></i>
        {title}
      </h1>
      <p className="text-gray-500 mt-1 ml-10">Gerencie esta seção do sistema.</p>
    </div>

    {/* Content Card - Darker Border */}
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-300 min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
        <i className={`fa-solid ${icon} text-3xl text-gray-300`}></i>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Em Desenvolvimento</h3>
      <p className="text-gray-500 max-w-md">
        A página <strong>{title}</strong> está sendo construída. Em breve você poderá acessar todas as funcionalidades deste módulo.
      </p>
    </div>
  </div>
);
