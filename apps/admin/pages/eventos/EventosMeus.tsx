import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';
import { useNavigate } from 'react-router-dom';

interface AdminEventData {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  fullDate: string; // for list view
  status: 'Ativo' | 'Rascunho' | 'Finalizado';
  category: string;
  type: string;
  description: string;
  bgClass: string; // For the grid card background
  isImageBg: boolean; // if true, bgClass is a url, else a gradient class
}

const MOCK_EVENTS: AdminEventData[] = [
  { 
    id: 1, 
    title: 'Rock Legends', 
    dateStart: '27/12/25', 
    dateEnd: '28/12/25',
    fullDate: '27/12/2025',
    status: 'Ativo', 
    category: 'Aniversário', 
    type: 'Bar/Pub',
    description: 'O espetáculo Rock Legends - com Edu Curti, Banda & Orquestra - é a homenagem absoluta às m...',
    bgClass: 'bg-brand-orange', 
    isImageBg: false
  },
  { 
    id: 2, 
    title: 'Sexta-Feira Country', 
    dateStart: '07/11/25', 
    dateEnd: '07/11/25',
    fullDate: '07/11/2025',
    status: 'Ativo', 
    category: 'Aniversário', 
    type: 'Auditório/Sala de Conferência',
    description: 'ghdfgdgdfgdfgdfgd',
    bgClass: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    isImageBg: true
  },
  { 
    id: 3, 
    title: 'teste de lotes', 
    dateStart: '06/11/25', 
    dateEnd: '22/11/25', 
    fullDate: '06/11/2025',
    status: 'Ativo', 
    category: 'Encontro, Networking', 
    type: 'Hotel Fazenda',
    description: 'gsdfgdgdgdf',
    bgClass: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    isImageBg: true
  }
];

export const EventosMeus: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Eventos Ativos'); // Matches screenshot default
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const stats = useMemo(() => {
    return [
      { label: 'Total de Eventos', value: MOCK_EVENTS.length, icon: 'fa-calendar', color: 'blue' as const },
      { label: 'Próximos Eventos', value: 1, icon: 'fa-calendar-check', color: 'green' as const },
      { label: 'Eventos Passados', value: 2, icon: 'fa-calendar-xmark', color: 'yellow' as const },
      { label: 'Ingressos Vendidos', value: 'Ingressos Vendidos', icon: 'fa-ticket', color: 'blue' as const, subLabel: '' }, // Just label in screenshot
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_EVENTS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      // Mock status logic
      // const matchesStatus = selectedStatus === 'Eventos Ativos' ? item.status === 'Ativo' : true; 
      // Simplified for demo
      return matchesSearch;
    });
  }, [searchTerm, selectedStatus]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Eventos Ativos');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Eventos" 
        subtitle="Crie e gerencie os eventos da sua filial."
        action={
          <button 
             onClick={() => navigate('/admin/eventos/novo')}
             className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Adicionar Evento
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
           <StatsCard key={idx} {...stat} value={stat.label === 'Ingressos Vendidos' ? '' : stat.value} label={stat.label === 'Ingressos Vendidos' ? 'Ingressos Vendidos' : stat.label} />
        ))}
      </div>

      <FilterSection 
        title="Filtros e Visualização"
        onClear={handleClearFilters}
        headerAction={
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'grid' 
                  ? 'bg-brand-orange text-white shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-600 bg-white'
              }`}
            >
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'list' 
                  ? 'bg-brand-orange text-white shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-600 bg-white'
              }`}
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>
          </div>
        }
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar Evento</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome, categoria ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-56 space-y-1">
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

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {paginatedData.map((item) => (
             <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col h-[400px]">
                {/* Top Image/Color Area */}
                <div className={`h-[55%] relative ${item.isImageBg ? '' : item.bgClass}`}>
                   {item.isImageBg ? (
                     <div className="w-full h-full relative">
                        <img src={item.bgClass} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     </div>
                   ) : (
                     <div className="w-full h-full flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white drop-shadow-md">Evento</h2>
                     </div>
                   )}
                </div>

                {/* Bottom Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                   <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{item.title}</h3>
                   
                   <div className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-3 uppercase tracking-wide">
                      <i className="fa-regular fa-calendar"></i> {item.dateStart} - {item.dateEnd}
                   </div>
                   
                   <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                     {item.description}
                   </p>

                   <div className="mt-auto flex justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-900 hover:bg-indigo-100 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-list text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-ticket text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-pen text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <TableContainer>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <TableHeader>
                 <TableHead>EVENTO</TableHead>
                 <TableHead>DATA</TableHead>
                 <TableHead>STATUS:</TableHead>
                 <TableHead>CATEGORIA</TableHead>
                 <TableHead>TIPO</TableHead>
                 <TableHead className="text-right">AÇÕES</TableHead>
               </TableHeader>
               <tbody>
                 {paginatedData.map((item) => (
                   <TableRow key={item.id}>
                     <TableCell>
                       <div className="flex items-center gap-3">
                         <span className="bg-brand-orange text-white px-2 py-1 rounded text-[10px] font-bold uppercase">Evento</span>
                         <span className="font-bold text-gray-800">{item.title}</span>
                       </div>
                     </TableCell>
                     <TableCell>
                       <span className="text-gray-600 font-medium">{item.fullDate}</span>
                     </TableCell>
                     <TableCell>
                       <Badge color="green">Ativo</Badge>
                     </TableCell>
                     <TableCell>{item.category}</TableCell>
                     <TableCell>{item.type}</TableCell>
                     <TableCell className="text-right">
                       <div className="flex justify-end gap-2">
                          <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all">
                             <i className="fa-solid fa-ticket text-xs"></i>
                          </button>
                          <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-brand-orange hover:bg-orange-50 flex items-center justify-center transition-all">
                             <i className="fa-solid fa-pen text-xs"></i>
                          </button>
                          <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all">
                             <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </tbody>
             </table>
           </div>
        </TableContainer>
      )}

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