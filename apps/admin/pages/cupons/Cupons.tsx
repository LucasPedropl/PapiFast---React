import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface CouponData {
  id: number;
  validityDate: string;
  validityTime: string;
  clientName: string | null;
  clientEmail: string | null;
  token: string;
  status: 'Em uso' | 'Disponível' | 'Utilizado';
  productsCount: number;
  discount: string;
}

const MOCK_COUPONS: CouponData[] = [
  { id: 1, validityDate: '18/12/2025', validityTime: '21:53', clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', token: '#teste', status: 'Em uso', productsCount: 4, discount: '20%' },
  { id: 2, validityDate: '18/12/2025', validityTime: '21:53', clientName: null, clientEmail: null, token: '#teste', status: 'Disponível', productsCount: 4, discount: '20%' },
  { id: 3, validityDate: '20/12/2025', validityTime: '10:00', clientName: 'João Silva', clientEmail: 'joao.silva@email.com', token: '#natal25', status: 'Utilizado', productsCount: 2, discount: '15%' },
  { id: 4, validityDate: '25/12/2025', validityTime: '23:59', clientName: null, clientEmail: null, token: '#verao10', status: 'Disponível', productsCount: 1, discount: '10%' },
  { id: 5, validityDate: '30/12/2025', validityTime: '18:00', clientName: 'Maria Oliveira', clientEmail: 'maria.o@email.com', token: '#vip_gold', status: 'Em uso', productsCount: 5, discount: '50%' },
];

export const Cupons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos os Status');
  const [selectedCity, setSelectedCity] = useState('Todas as Cidades'); // Mock filter
  const [selectedState, setSelectedState] = useState('Todos os Estados'); // Mock filter
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derived Stats
  const stats = useMemo(() => {
    const total = MOCK_COUPONS.length;
    const available = MOCK_COUPONS.filter(c => c.status === 'Disponível').length;
    const inUse = MOCK_COUPONS.filter(c => c.status === 'Em uso').length;
    const used = MOCK_COUPONS.filter(c => c.status === 'Utilizado').length;

    return [
      { label: 'Total de Cupons', value: total, icon: 'fa-ticket', color: 'blue' as const },
      { label: 'Disponíveis', value: available, icon: 'fa-check-circle', color: 'green' as const },
      { label: 'Em Uso', value: inUse, icon: 'fa-hourglass-half', color: 'yellow' as const },
      { label: 'Utilizados', value: used, icon: 'fa-check-double', color: 'blue' as const }, // Using blue/cyan for used
    ];
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_COUPONS.filter(item => {
      const matchesSearch = 
        (item.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        item.token.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'Todos os Status' || item.status === selectedStatus;
      
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
    setSelectedStatus('Todos os Status');
    setSelectedCity('Todas as Cidades');
    setSelectedState('Todos os Estados');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Cupons" 
        subtitle="Gerencie e monitore seus cupons de desconto"
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Criar Novo Cupom
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
              placeholder="Buscar por cliente, token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos os Status</option>
              <option>Disponível</option>
              <option>Em uso</option>
              <option>Utilizado</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Token</label>
          <div className="relative">
            <select 
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>--- Todos os Tokens ---</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Estado</label>
          <div className="relative">
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos os Estados</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Cidade</label>
          <div className="relative">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todas as Cidades</option>
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
              <TableHead><i className="fa-regular fa-calendar mr-2 text-gray-300"></i>VALIDADE</TableHead>
              <TableHead><i className="fa-solid fa-user mr-2 text-gray-300"></i>CLIENTE</TableHead>
              <TableHead><i className="fa-solid fa-ticket mr-2 text-gray-300"></i>TOKEN</TableHead>
              <TableHead><i className="fa-solid fa-flag mr-2 text-gray-300"></i>STATUS</TableHead>
              <TableHead className="text-center"><i className="fa-solid fa-box mr-2 text-gray-300"></i>PRODUTOS</TableHead>
              <TableHead className="text-center"><i className="fa-solid fa-percent mr-2 text-gray-300"></i>DESCONTO</TableHead>
              <TableHead className="text-right"><i className="fa-solid fa-gear mr-2 text-gray-300"></i>AÇÕES</TableHead>
            </TableHeader>
            <tbody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">{item.validityDate}</span>
                      <span className="text-xs text-gray-400">{item.validityTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.clientName ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-brand-orange">{item.clientName}</span>
                        <span className="text-xs text-gray-400">{item.clientEmail}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Não atribuído</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold border border-gray-200 inline-block font-mono">
                      {item.token}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge color={item.status === 'Disponível' ? 'green' : item.status === 'Em uso' ? 'yellow' : 'gray'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-gray-700">{item.productsCount}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-gray-900">{item.discount}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                    Nenhum cupom encontrado.
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
