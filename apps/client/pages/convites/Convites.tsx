import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface ConviteData {
  id: number;
  evento: string;
  grupo: string;
  quantidade: number;
  criadoEm: string;
  criadoHora: string;
}

// Extended Mock Data to demonstrate pagination
const MOCK_DATA: ConviteData[] = [
  { id: 1, evento: 'Rock Legends', grupo: 'Familia', quantidade: 3, criadoEm: '01/12/2025', criadoHora: '14:48' },
  { id: 2, evento: 'Rock Legends', grupo: 'VIPs', quantidade: 2, criadoEm: '01/12/2025', criadoHora: '14:36' },
  { id: 3, evento: 'Festival de Verão', grupo: 'Promoters', quantidade: 15, criadoEm: '30/11/2025', criadoHora: '09:12' },
  { id: 4, evento: 'Noite de Gala', grupo: 'Imprensa', quantidade: 5, criadoEm: '28/11/2025', criadoHora: '16:20' },
  { id: 5, evento: 'Sexta-Feira Country', grupo: 'Sócios', quantidade: 50, criadoEm: '25/11/2025', criadoHora: '10:00' },
  { id: 6, evento: 'Rock Legends', grupo: 'Amigos', quantidade: 8, criadoEm: '24/11/2025', criadoHora: '11:30' },
  { id: 7, evento: 'Festival de Verão', grupo: 'Patrocinadores', quantidade: 10, criadoEm: '23/11/2025', criadoHora: '14:15' },
  { id: 8, evento: 'Noite de Gala', grupo: 'Influencers', quantidade: 12, criadoEm: '22/11/2025', criadoHora: '18:45' },
  { id: 9, evento: 'Sexta-Feira Country', grupo: 'Funcionários', quantidade: 20, criadoEm: '21/11/2025', criadoHora: '09:00' },
  { id: 10, evento: 'Rock Legends', grupo: 'Camarote', quantidade: 4, criadoEm: '20/11/2025', criadoHora: '13:20' },
  { id: 11, evento: 'Festival de Verão', grupo: 'Pista', quantidade: 100, criadoEm: '19/11/2025', criadoHora: '10:10' },
  { id: 12, evento: 'Noite de Gala', grupo: 'Diretoria', quantidade: 6, criadoEm: '18/11/2025', criadoHora: '15:55' },
];

export const Convites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('Todos os Eventos');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Estatísticas derivadas dos dados (usando todos os dados, não apenas os paginados)
  const stats = useMemo(() => {
    const uniqueEvents = new Set(MOCK_DATA.map(d => d.evento)).size;
    const totalConvites = MOCK_DATA.reduce((acc, curr) => acc + curr.quantidade, 0);
    const uniqueClients = new Set(MOCK_DATA.map(d => d.grupo)).size; 
    
    return [
      { label: 'Total de Eventos', value: uniqueEvents, icon: 'fa-envelope', color: 'blue' as const },
      { label: 'Total de Convites', value: totalConvites, icon: 'fa-ticket', color: 'green' as const },
      { label: 'Eventos Únicos', value: uniqueEvents, icon: 'fa-calendar', color: 'green' as const },
      { label: 'Clientes Únicos', value: uniqueClients, icon: 'fa-users', color: 'orange' as const },
    ];
  }, []);

  // Filtragem dos dados
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const matchesSearch = 
        item.grupo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.evento.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEvent = selectedEvent === 'Todos os Eventos' || item.evento === selectedEvent;

      return matchesSearch && matchesEvent;
    });
  }, [searchTerm, selectedEvent]);

  // Paginação dos dados filtrados
  const paginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  // Resetar para página 1 quando filtrar
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedEvent]);

  const uniqueEventNames = useMemo(() => ['Todos os Eventos', ...Array.from(new Set(MOCK_DATA.map(d => d.evento)))], []);

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      
      {/* Page Header */}
      <PageHeader 
        title="Gerenciar Grupos de convidados" 
        subtitle="Gerencie os seus grupos de convidados para os seus eventos."
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Cadastrar Convite
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard 
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filter Section */}
      <FilterSection 
        onClear={() => {
          setSearchTerm('');
          setSelectedEvent('Todos os Eventos');
        }}
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

        <div className="w-full lg:w-64 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Evento</label>
          <div className="relative">
             <select 
               value={selectedEvent}
               onChange={(e) => setSelectedEvent(e.target.value)}
               className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
             >
               {uniqueEventNames.map(evt => (
                 <option key={evt} value={evt}>{evt}</option>
               ))}
             </select>
             <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>
      </FilterSection>

      {/* Data Table */}
      <TableContainer>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <TableHeader>
              <TableHead>Evento</TableHead>
              <TableHead>Grupos de Convidados</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead>Criado Em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableHeader>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge color="orange">{item.evento}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-gray-800 underline decoration-gray-300 underline-offset-4 decoration-2 cursor-pointer hover:text-brand-orange hover:decoration-brand-orange transition-all">{item.grupo}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-100">
                        {item.quantidade}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700">{item.criadoEm}</span>
                        <span className="text-xs text-gray-400">{item.criadoHora}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm border border-gray-100 flex items-center justify-center ml-auto">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-magnifying-glass text-2xl text-gray-300"></i>
                      </div>
                      <p className="text-base font-bold text-gray-600">Nenhum convite encontrado</p>
                      <p className="text-sm text-gray-400">Tente ajustar os filtros de pesquisa</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Component */}
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