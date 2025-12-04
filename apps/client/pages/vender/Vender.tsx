import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface SalesEvent {
  id: number;
  image?: string;
  name: string;
  date: string;
  items: string[];
}

const MOCK_EVENTS: SalesEvent[] = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=200',
    name: 'Sexta-Feira Country', 
    date: '04/12/2025', 
    items: ['Ingresso'] 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=200',
    name: 'Sexta-Feira Countrygf', 
    date: '04/12/2025', 
    items: ['Ingresso'] 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=200',
    name: 'Sexta-Feira Countrygfg', 
    date: '04/12/2025', 
    items: ['Ingresso'] 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1459749411177-287ce3288789?auto=format&fit=crop&q=80&w=200',
    name: 'tgshehe3th', 
    date: '04/12/2025', 
    items: ['Ingresso'] 
  },
];

export const Vender: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Eventos Ativos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const stats = useMemo(() => [
    { label: 'Eventos com Vendas', value: 4, icon: 'fa-store', color: 'blue' as const },
    { label: 'Itens Disponíveis', value: 43, icon: 'fa-ticket', color: 'blue' as const }, // cyan/blue
    { label: 'Itens Vendidos', value: 5, icon: 'fa-cart-shopping', color: 'green' as const },
    { label: 'Próximos Eventos', value: 4, icon: 'fa-calendar', color: 'yellow' as const },
  ], []);

  const filteredData = useMemo(() => {
    return MOCK_EVENTS.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

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
      <FilterSection title="Filtros e Pesquisa">
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
              <option>Todos</option>
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
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                         {item.image ? (
                           <img src={item.image} alt="" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400">
                             <i className="fa-solid fa-image"></i>
                           </div>
                         )}
                      </div>
                      <span className="font-bold text-gray-800">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-medium">{item.date}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.items.map((i, idx) => (
                      <span key={idx} className="bg-gray-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        {i}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                       <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-all">
                          <i className="fa-solid fa-list text-xs"></i>
                       </button>
                       <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-all">
                          <i className="fa-solid fa-cart-shopping text-xs"></i>
                       </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </TableContainer>
    </div>
  );
};
