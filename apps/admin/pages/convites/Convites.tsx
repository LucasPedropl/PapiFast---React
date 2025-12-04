import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface InviteData {
  id: number;
  clientName: string;
  clientEmail: string;
  count: number;
  eventName: string;
  status: 'Ativo' | 'Desativado';
  createdAt: string;
  createdTime: string;
}

const MOCK_INVITES: InviteData[] = [
  { id: 1, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', count: 3, eventName: 'Rock Legends', status: 'Desativado', createdAt: '01/12/2025', createdTime: '14:48' },
  { id: 2, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', count: 5, eventName: 'Rock Legends', status: 'Ativo', createdAt: '01/12/2025', createdTime: '14:36' },
  { id: 3, clientName: 'Mariana Silva', clientEmail: 'mariana.silva@email.com', count: 2, eventName: 'Festival de Verão', status: 'Ativo', createdAt: '30/11/2025', createdTime: '10:00' },
  { id: 4, clientName: 'João Souza', clientEmail: 'joao.souza@email.com', count: 1, eventName: 'Sexta-Feira Country', status: 'Ativo', createdAt: '29/11/2025', createdTime: '09:15' },
  { id: 5, clientName: 'Fernanda Costa', clientEmail: 'fernanda.costa@email.com', count: 4, eventName: 'Rock Legends', status: 'Ativo', createdAt: '28/11/2025', createdTime: '16:20' },
  { id: 6, clientName: 'Carlos Oliveira', clientEmail: 'carlos.oliveira@email.com', count: 2, eventName: 'Noite de Gala', status: 'Desativado', createdAt: '27/11/2025', createdTime: '11:30' },
];

export const Convites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos os Status');
  const [selectedEvent, setSelectedEvent] = useState('Todos os Eventos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derived Stats
  const stats = useMemo(() => {
    const totalInvites = MOCK_INVITES.length;
    const activeInvites = MOCK_INVITES.filter(i => i.status === 'Ativo').length;
    const totalGuests = MOCK_INVITES.reduce((acc, curr) => acc + curr.count, 0);
    const eventsWithInvites = new Set(MOCK_INVITES.map(i => i.eventName)).size;

    return [
      { label: 'Total de Convites', value: totalInvites, icon: 'fa-envelope', color: 'blue' as const },
      { label: 'Convites Ativos', value: activeInvites, icon: 'fa-check-circle', color: 'green' as const },
      { label: 'Total de Convidados', value: totalGuests, icon: 'fa-users', color: 'yellow' as const }, // Yellow/Orange often used for users
      { label: 'Eventos com Convites', value: eventsWithInvites, icon: 'fa-calendar', color: 'blue' as const }, // Cyan/Blue
    ];
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_INVITES.filter(item => {
      const matchesSearch = 
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eventName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'Todos os Status' || item.status === selectedStatus;
      const matchesEvent = selectedEvent === 'Todos os Eventos' || item.eventName === selectedEvent;

      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [searchTerm, selectedStatus, selectedEvent]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const uniqueEvents = Array.from(new Set(MOCK_INVITES.map(i => i.eventName)));

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Todos os Status');
    setSelectedEvent('Todos os Eventos');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Convites" 
        subtitle="Gerencie e acompanhe todos os convites dos seus eventos"
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Criar Novo Convite
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
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por cliente, email ou evento..."
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
              <option>Ativo</option>
              <option>Desativado</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-56 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Evento</label>
          <div className="relative">
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos os Eventos</option>
              {uniqueEvents.map(e => <option key={e} value={e}>{e}</option>)}
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
              <TableHead><i className="fa-solid fa-user mr-2 text-gray-300"></i>CLIENTE</TableHead>
              <TableHead><i className="fa-solid fa-envelope mr-2 text-gray-300"></i>E-MAIL</TableHead>
              <TableHead className="text-center"><i className="fa-solid fa-users mr-2 text-gray-300"></i>CONVITES</TableHead>
              <TableHead><i className="fa-solid fa-calendar-day mr-2 text-gray-300"></i>EVENTO</TableHead>
              <TableHead className="text-center">STATUS</TableHead>
              <TableHead><i className="fa-solid fa-clock mr-2 text-gray-300"></i>CRIADO EM</TableHead>
              <TableHead className="text-right"><i className="fa-solid fa-gear mr-2 text-gray-300"></i>AÇÕES</TableHead>
            </TableHeader>
            <tbody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="font-bold text-gray-800">{item.clientName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{item.clientEmail}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-100">
                      {item.count}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold border border-blue-100 inline-block">
                      {item.eventName}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge color={item.status === 'Ativo' ? 'green' : 'red'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">{item.createdAt}</span>
                      <span className="text-xs text-gray-400">{item.createdTime}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100 flex items-center justify-center transition-all">
                        <i className="fa-solid fa-eye text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100 flex items-center justify-center transition-all">
                        <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                    Nenhum convite encontrado.
                  </td>
                </tr>
              )}
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
