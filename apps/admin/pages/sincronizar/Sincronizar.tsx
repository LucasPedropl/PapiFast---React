import React from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';

export const Sincronizar: React.FC = () => {
  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Sincronização de Dados UAIPDV" 
        subtitle="Importe e atualize seus dados do UAIPDV para a plataforma web"
      />

      <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-10 flex flex-col items-center justify-center text-center min-h-[500px] relative overflow-hidden">
        
        {/* Top Highlight Badge */}
        <div className="mb-8">
           <span className="bg-orange-50 text-brand-orange border border-orange-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
             <i className="fa-solid fa-circle-info"></i> Sincronize seus dados
           </span>
        </div>

        {/* Content */}
        <p className="text-gray-500 max-w-lg mb-8 leading-relaxed">
           Traga seus dados (Filiais, produtos, categorias, preços e modificadores) gerenciados no UAIPDV para a plataforma web de forma rápida e segura.
        </p>

        {/* Cloud Icon Visual */}
        <div className="relative mb-12">
           <div className="w-40 h-24 bg-sky-400 rounded-full blur-[40px] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
           <i className="fa-solid fa-cloud text-8xl text-sky-400 drop-shadow-xl relative z-10 animate-pulse"></i>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <i className="fa-solid fa-rotate text-white text-3xl animate-spin" style={{ animationDuration: '3s' }}></i>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
           <button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
             <i className="fa-solid fa-rotate text-gray-300"></i>
             <div className="text-left">
                <div className="text-sm">Sincronia Parcial</div>
                <div className="text-[10px] text-gray-300 font-normal">Atualiza apenas preços e produtos</div>
             </div>
           </button>

           <button className="flex-1 bg-brand-orange hover:bg-brand-darkYellow text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-100 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
             <i className="fa-solid fa-rotate-right text-orange-100"></i>
             <div className="text-left">
                <div className="text-sm">Sincronizar Tudo</div>
                <div className="text-[10px] text-orange-100 font-normal">Sincroniza todos os dados</div>
             </div>
           </button>
        </div>

      </div>
    </div>
  );
};