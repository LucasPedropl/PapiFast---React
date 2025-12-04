import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

// Interfaces
interface CampanhaData {
  id: number;
  nome: string;
  filial: string;
  status: 'Ativa' | 'Pausada' | 'Rascunho' | 'Finalizada';
  dataPostagem: string;
  horaPostagem: string;
}

// Mock Data
const CAMPAIGNS_DATA: CampanhaData[] = [
  { id: 1, nome: 'Campanha Desmostração', filial: 'UAI PDV - DEMONSTRACAO', status: 'Ativa', dataPostagem: '26/11/2025', horaPostagem: '16:55' },
  { id: 2, nome: 'Campanha teste', filial: 'Uaipdv - Shows', status: 'Ativa', dataPostagem: '26/11/2025', horaPostagem: '16:44' },
  { id: 3, nome: 'Sexta Da Promo', filial: 'UAIPDV- Eventos', status: 'Ativa', dataPostagem: '26/11/2025', horaPostagem: '18:00' },
  { id: 4, nome: 'Liquidação de Verão', filial: 'Matriz São Paulo', status: 'Pausada', dataPostagem: '25/11/2025', horaPostagem: '10:00' },
  { id: 5, nome: 'Black Friday Antecipada', filial: 'Filial Rio', status: 'Rascunho', dataPostagem: '24/11/2025', horaPostagem: '09:30' },
  { id: 6, nome: 'Dia dos Pais', filial: 'Todas as Filiais', status: 'Finalizada', dataPostagem: '10/08/2025', horaPostagem: '08:00' },
];

export const Campanhas: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos os Status');
  const [selectedFilial, setSelectedFilial] = useState('--- Todas as Filiais ---');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Stats Logic
  const stats = useMemo(() => {
    return [
      { label: 'Total de Campanhas', value: CAMPAIGNS_DATA.length, icon: 'fa-bullhorn', color: 'blue' as const },
      { label: 'Campanhas Ativas', value: CAMPAIGNS_DATA.filter(c => c.status === 'Ativa').length, icon: 'fa-check-circle', color: 'green' as const },
      { label: 'Campanhas Pausadas', value: CAMPAIGNS_DATA.filter(c => c.status === 'Pausada').length, icon: 'fa-pause-circle', color: 'yellow' as const },
      { label: 'Filiais Ativas', value: new Set(CAMPAIGNS_DATA.map(c => c.filial)).size, icon: 'fa-building', color: 'blue' as const }, // cyan/blue equivalent
    ];
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return CAMPAIGNS_DATA.filter(item => {
      const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.filial.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos os Status' || item.status === selectedStatus;
      const matchesFilial = selectedFilial === '--- Todas as Filiais ---' || item.filial === selectedFilial;

      return matchesSearch && matchesStatus && matchesFilial;
    });
  }, [searchTerm, selectedStatus, selectedFilial]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Todos os Status');
    setSelectedFilial('--- Todas as Filiais ---');
    setCurrentPage(1);
  };

  const uniqueFiliais = Array.from(new Set(CAMPAIGNS_DATA.map(c => c.filial)));

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      {/* Header */}
      <PageHeader 
        title="Gestão de Campanhas" 
        subtitle="Gerencie e monitore suas campanhas promocionais"
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Criar Nova Campanha
          </button>
        }
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
        onClear={handleClearFilters}
        headerAction={
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
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
          </div>
        }
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Pesquisar por campanha ou filial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-48 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos os Status</option>
              <option>Ativa</option>
              <option>Pausada</option>
              <option>Rascunho</option>
              <option>Finalizada</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-56 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Filial</label>
          <div className="relative">
            <select 
              value={selectedFilial}
              onChange={(e) => setSelectedFilial(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>--- Todas as Filiais ---</option>
              {uniqueFiliais.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>
      </FilterSection>

      {/* Content */}
      {viewMode === 'list' ? (
        <TableContainer>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <TableHeader>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Filial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Postagem</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableHeader>
                <tbody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id}>
                       <TableCell><span className="font-bold text-gray-800">{item.nome}</span></TableCell>
                       <TableCell>
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold border border-blue-100 flex items-center gap-1 w-fit">
                             <i className="fa-solid fa-building"></i> {item.filial}
                          </span>
                       </TableCell>
                       <TableCell>
                          <Badge color={item.status === 'Ativa' ? 'green' : item.status === 'Pausada' ? 'yellow' : 'gray'}>
                            <i className={`fa-solid ${item.status === 'Ativa' ? 'fa-play-circle' : 'fa-circle'} mr-1 text-[10px]`}></i>
                            {item.status}
                          </Badge>
                       </TableCell>
                       <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700">{item.dataPostagem}</span>
                            <span className="text-xs text-gray-400">{item.horaPostagem}</span>
                          </div>
                       </TableCell>
                       <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100 flex items-center justify-center transition-all">
                               <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-brand-orange hover:text-white border border-gray-100 flex items-center justify-center transition-all">
                               <i className="fa-solid fa-pen text-xs"></i>
                            </button>
                          </div>
                       </TableCell>
                    </TableRow>
                  ))}
                </tbody>
             </table>
          </div>
        </TableContainer>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {paginatedData.map((item) => (
             <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col gap-4 group hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-blue-100 flex items-center gap-1 max-w-[70%] truncate">
                     <i className="fa-solid fa-building flex-shrink-0"></i> <span className="truncate">{item.filial}</span>
                  </span>
                  <Badge color={item.status === 'Ativa' ? 'green' : item.status === 'Pausada' ? 'yellow' : 'gray'}>
                    <i className={`fa-solid ${item.status === 'Ativa' ? 'fa-play-circle' : 'fa-circle'} mr-1 text-[10px]`}></i>
                    {item.status}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors">{item.nome}</h3>
                </div>

                <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i> Postagem: {item.dataPostagem}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                     <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-center border border-blue-100/50">
                       <i className="fa-solid fa-cart-shopping text-xs"></i>
                     </button>
                     <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-center border border-blue-100/50">
                       <i className="fa-solid fa-bullhorn text-xs"></i>
                     </button>
                     <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-center border border-blue-100/50">
                       <i className="fa-solid fa-file-lines text-xs"></i>
                     </button>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors flex items-center justify-center shadow-sm border border-yellow-100">
                    <i className="fa-solid fa-pen text-xs"></i>
                  </button>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Pagination */}
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