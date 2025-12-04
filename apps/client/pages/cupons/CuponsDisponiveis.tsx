import React, { useState } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { Pagination } from '../../../../components/common/Pagination';
import { FilterSection } from '../../../../components/common/FilterSection';

interface Coupon {
  id: number;
  discount: string;
  condition: string;
  description: string;
  code: string;
  validUntil: string;
}

const MOCK_COUPONS: Coupon[] = Array(8).fill(null).map((_, idx) => ({
  id: idx + 1,
  discount: '30% OFF',
  condition: 'em 1 produto(s) selecionado(s)',
  description: 'Válido para compras na filial associada. Use o código #Doginho para ativar.',
  code: '#Doginho',
  validUntil: '10/12/2025',
}));

export const CuponsDisponiveis: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Cupons Disponíveis" 
        subtitle="Veja todos os cupons que você pode resgatar e usar em seus pedidos."
      />

      <FilterSection 
        title="Filtros e pesquisa inteligentes"
        icon="fa-filter"
        headerAction={
          <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm">
             <i className="fa-solid fa-sliders"></i> Mostrar filtros
          </button>
        }
      >
        <div className="w-full">
           <p className="text-sm text-gray-500">Organize os cupons por estabelecimento, desconto ou localização com um painel elegante e retrátil.</p>
        </div>
      </FilterSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {MOCK_COUPONS.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 group relative overflow-hidden">
               {/* Decorative top strip */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-brand-darkYellow"></div>

               <div className="p-6 flex-1">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 rounded-full bg-brand-lightYellow flex items-center justify-center text-brand-orange text-xl shadow-sm flex-shrink-0">
                        <i className="fa-solid fa-tag"></i>
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-gray-800 leading-none">{coupon.discount}</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">{coupon.condition}</p>
                     </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 min-h-[40px]">
                     Válido para compras na filial associada. Use o código <span className="font-bold text-brand-orange">{coupon.code}</span> para ativar.
                  </p>

                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <button className="w-full py-2.5 rounded-lg border border-brand-orange text-brand-orange font-bold text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 group-hover:bg-brand-orange group-hover:text-white">
                     <i className="fa-solid fa-scissors transform -rotate-90"></i> Pegar Cupom
                  </button>
               </div>
               
               <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-500">
                  <button className="text-brand-orange hover:underline">Ver regras</button>
                  <span>Válido até {coupon.validUntil}</span>
               </div>
            </div>
         ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <Pagination 
          currentPage={currentPage}
          totalItems={50} // Mock total for demo
          itemsPerPage={itemsPerPage}
          totalPages={Math.ceil(50 / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
