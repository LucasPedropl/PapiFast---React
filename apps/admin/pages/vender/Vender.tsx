import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface SalesEventData {
  id: number;
  eventName: string;
  date: string;
  itemsForSale: string[];
}

const MOCK_SALES_EVENTS: SalesEventData[] = [
  { id: 1, eventName: 'Rock Legends', date: '27/12/2025', itemsForSale: ['Ingresso'] },
  { id: 2, eventName: 'Sexta-Feira Country', date: '07/11/2025', itemsForSale: ['Ingresso'] },
  { id: 3, eventName: 'teste de lotes', date: '06/11/2025', itemsForSale: ['Ingresso'] },
];

export const Vender: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Eventos Ativos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const stats = useMemo(() => {
    return [
      { label: 'Eventos com Vendas', value: MOCK_SALES_EVENTS.length, icon: 'fa-store', color: 'blue' as const },
      { label: 'Itens Disponiveis', value: 88, icon: 'fa-ticket', color: 'blue' as const }, // Using blue for cyan
      { label: 'Itens Vendidos', value: 5, icon: 'fa-cart-shopping', color: 'green' as const },
      { label: 'Próximos Eventos', value: 1, icon: 'fa-calendar', color: 'yellow' as const },
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_SALES_EVENTS.filter(item => {
      const matchesSearch = item.eventName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedStatus('Eventos Ativos');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Vendas de Itens" 
        subtitle="Gerencie as vendas de ingressos, hospedagens e entradas para seus eventos."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={handleClear}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar Evento</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome do evento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Status do Evento</label>
          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Eventos Ativos</option>
              <option>Todos os Status</option>
              <option>Finalizados</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>
      </FilterSection>

      {/* Table */}
      <TableContainer>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <TableHeader>
               <TableHead>EVENTO</TableHead>
               <TableHead>DATA DO EVENTO</TableHead>
               <TableHead className="text-center">ITENS À VENDA</TableHead>
               <TableHead className="text-right">AÇÕES</TableHead>
             </TableHeader>
             <tbody>
               {paginatedData.map((item) => (
                 <TableRow key={item.id}>
                   <TableCell>
                     <div className="flex items-center gap-3">
                       <span className="bg-brand-orange text-white px-2 py-1 rounded text-[10px] font-bold uppercase">Evento</span>
                       <span className="font-bold text-gray-800">{item.eventName}</span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <span className="text-gray-600 font-medium">{item.date}</span>
                   </TableCell>
                   <TableCell className="text-center">
                     {item.itemsForSale.map(i => (
                       <span key={i} className="inline-block bg-gray-600 text-white text-[10px] font-bold px-2 py-1 rounded mx-1">
                         {i}
                       </span>
                     ))}
                   </TableCell>
                   <TableCell className="text-right">
                     <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all border border-gray-200">
                           <i className="fa-solid fa-ticket text-xs"></i>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:text-brand-orange hover:bg-orange-50 flex items-center justify-center transition-all border border-gray-200">
                           <i className="fa-solid fa-cart-shopping text-xs"></i>
                        </button>
                     </div>
                   </TableCell>
                 </TableRow>
               ))}
             </tbody>
           </table>
         </div>
      </TableContainer>

      <Pagination 
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};