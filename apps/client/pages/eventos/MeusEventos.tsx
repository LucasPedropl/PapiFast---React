import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';
import { EventCard, EventData } from '../../../../components/common/EventCard';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_EVENTS: EventData[] = [
  { 
    id: 1, 
    title: 'Rock Legends', 
    dateStart: '27/12/2025', 
    dateEnd: '28/12/2025', 
    status: 'Ativo', 
    category: 'Aniversário', 
    type: 'Bar/Pub',
    description: 'O espetáculo Rock Legends - com Edu Curti, Banda & Orquestra - é a homenagem absoluta às maiores lendas do Rock.',
    imageColor: 'bg-gradient-to-br from-orange-400 to-red-600'
  },
  { 
    id: 2, 
    title: 'Sexta-Feira Country', 
    dateStart: '07/11/2025', 
    dateEnd: '07/11/2025', 
    status: 'Ativo', 
    category: 'Aniversário', 
    type: 'Auditório/Sala de Conferência',
    description: 'A melhor sexta-feira sertaneja da região com as melhores duplas e open bar completo.',
    imageColor: 'bg-gradient-to-br from-blue-900 to-slate-800'
  },
  { 
    id: 3, 
    title: 'Teste de Lotes', 
    dateStart: '06/11/2025', 
    dateEnd: '22/11/2025', 
    status: 'Ativo', 
    category: 'Encontro, Networking', 
    type: 'Hotel Fazenda',
    description: 'Evento exclusivo para testes de virada de lote e configurações avançadas de ingressos.',
    imageColor: 'bg-gradient-to-br from-gray-700 to-black'
  },
  { 
    id: 4, 
    title: 'Festival de Verão', 
    dateStart: '15/01/2026', 
    dateEnd: '16/01/2026', 
    status: 'Rascunho', 
    category: 'Show', 
    type: 'Estádio',
    description: 'O maior festival de verão da cidade está de volta com atrações nacionais e internacionais.',
    imageColor: 'bg-gradient-to-br from-yellow-400 to-orange-500'
  },
  { 
    id: 5, 
    title: 'Workshop de Tecnologia', 
    dateStart: '10/02/2026', 
    dateEnd: '10/02/2026', 
    status: 'Finalizado', 
    category: 'Workshop', 
    type: 'Centro de Convenções',
    description: 'Um dia imersivo com os maiores nomes da tecnologia e inovação do mercado.',
    imageColor: 'bg-gradient-to-br from-indigo-500 to-purple-600'
  }
];

export const MeusEventos: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Derived Stats
  const stats = useMemo(() => {
    return [
      { label: 'Total de Eventos', value: MOCK_EVENTS.length, icon: 'fa-calendar', color: 'blue' as const },
      { label: 'Próximos Eventos', value: MOCK_EVENTS.filter(e => e.status === 'Ativo').length, icon: 'fa-calendar-check', color: 'green' as const },
      { label: 'Eventos Passados', value: MOCK_EVENTS.filter(e => e.status === 'Finalizado').length, icon: 'fa-calendar-xmark', color: 'yellow' as const },
      { label: 'Ingressos Vendidos', value: '1.240', icon: 'fa-ticket', color: 'blue' as const, subLabel: 'Total geral' },
    ];
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_EVENTS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos' || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Todos');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <PageHeader 
        title="Gestão de Eventos"
        subtitle="Crie e gerencie os eventos da sua filial."
        action={
          <button 
            onClick={() => navigate('/app/eventos/novo')} // Mock path
            className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Adicionar Evento
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard 
            key={idx}
            {...stat}
          />
        ))}
      </div>

      {/* Filters & Visualization Toggle */}
      <FilterSection 
        title="Filtros e Visualização"
        onClear={handleClearFilters}
        headerAction={
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-brand-orange shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-brand-orange shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-600'
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

        <div className="w-full lg:w-64 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Status do Evento</label>
          <div className="relative">
             <select 
               value={selectedStatus}
               onChange={(e) => setSelectedStatus(e.target.value)}
               className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
             >
               <option value="Todos">Todos os Status</option>
               <option value="Ativo">Ativos</option>
               <option value="Rascunho">Rascunhos</option>
               <option value="Finalizado">Finalizados</option>
             </select>
             <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>
      </FilterSection>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {paginatedData.map((event) => (
            <EventCard 
              key={event.id} 
              event={event}
              onManage={() => console.log('Gerenciar', event.id)}
              onTickets={() => console.log('Ingressos', event.id)}
              onEdit={() => console.log('Editar', event.id)}
              onDelete={() => console.log('Deletar', event.id)}
            />
          ))}
        </div>
      ) : (
        <TableContainer>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <TableHeader>
                <TableHead>Evento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableHeader>
              <tbody>
                {paginatedData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-10 rounded-lg ${event.imageColor} shadow-sm`}></div>
                        <span className="font-bold text-gray-900">{event.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-medium">{event.dateStart}</span>
                    </TableCell>
                    <TableCell>
                      <Badge color={event.status === 'Ativo' ? 'green' : event.status === 'Rascunho' ? 'yellow' : 'gray'}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button title="Gerenciar" className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 flex items-center justify-center transition-all">
                          <i className="fa-solid fa-list-check text-xs"></i>
                        </button>
                        <button title="Editar" className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-brand-orange hover:text-white border border-gray-100 flex items-center justify-center transition-all">
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button title="Excluir" className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-100 flex items-center justify-center transition-all">
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