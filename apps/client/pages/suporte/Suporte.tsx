import React from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';

export const Suporte: React.FC = () => {
  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Suporte Técnico" 
        subtitle="Precisa de ajuda? Entre em contato com nossa equipe especializada."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
           {/* Card 1 */}
           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                 <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div>
                 <h3 className="font-bold text-gray-900">WhatsApp</h3>
                 <p className="text-sm text-gray-500 mt-1">Atendimento rápido via chat.</p>
                 <a href="#" className="text-green-600 font-bold text-sm mt-2 inline-block hover:underline">(11) 99999-9999</a>
              </div>
           </div>

           {/* Card 2 */}
           <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                 <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                 <h3 className="font-bold text-gray-900">E-mail</h3>
                 <p className="text-sm text-gray-500 mt-1">Para dúvidas mais complexas.</p>
                 <a href="#" className="text-blue-600 font-bold text-sm mt-2 inline-block hover:underline">suporte@papifast.com</a>
              </div>
           </div>

           {/* Card 3 */}
           <div className="bg-gradient-to-br from-brand-orange to-brand-deepOrange rounded-2xl p-6 shadow-lg text-white">
              <h3 className="font-bold text-lg mb-2">Horário de Atendimento</h3>
              <p className="text-orange-100 text-sm mb-4">
                Nossa equipe está disponível para te ajudar nos seguintes horários:
              </p>
              <div className="space-y-2 text-sm font-medium">
                 <div className="flex justify-between border-b border-white/20 pb-1">
                   <span>Seg - Sex</span>
                   <span>08:00 - 18:00</span>
                 </div>
                 <div className="flex justify-between border-b border-white/20 pb-1">
                   <span>Sábado</span>
                   <span>09:00 - 13:00</span>
                 </div>
                 <div className="flex justify-between text-orange-200">
                   <span>Domingo</span>
                   <span>Fechado</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm p-8">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Envie uma mensagem</h3>
           <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Seu Nome</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" placeholder="Digite seu nome" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Seu E-mail</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" placeholder="Digite seu e-mail" />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Assunto</label>
                 <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-white">
                    <option>Dúvida sobre o sistema</option>
                    <option>Reportar um problema</option>
                    <option>Sugestão de melhoria</option>
                    <option>Outros</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Mensagem</label>
                 <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all resize-none" placeholder="Descreva sua solicitação..."></textarea>
              </div>

              <div className="pt-2">
                 <button type="button" className="bg-brand-orange hover:bg-brand-darkYellow text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 w-full md:w-auto">
                    Enviar Mensagem
                 </button>
              </div>
           </form>
        </div>

      </div>
    </div>
  );
};
