import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface MyCoupon {
  id: number;
  clientName: string;
  clientEmail: string;
  token: string;
  products: number;
  discount: string;
  validity: string;
  status: 'Expirado' | 'Disponível' | 'Utilizado';
}

const MOCK_MY_COUPONS: MyCoupon[] = [
  { id: 1, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', token: '#Sorvete de Morango', products: 1, discount: '20%', validity: '30/11/2025 11:44', status: 'Expirado' },
  { id: 2, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', token: '#Sorvete de Morango', products: 1, discount: '20%', validity: '30/11/2025 11:44', status: 'Expirado' },
  { id: 3, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', token: '#teste', products: 4, discount: '20%', validity: '18/12/2025 21:53', status: 'Expirado' },
];

export const MeusCupons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const stats = useMemo(() => [
    { label: 'Total de Cupons', value: 3, icon: 'fa-ticket', color: 'blue' as const },
    { label: 'Disponíveis', value: 0, icon: 'fa-check-circle', color: 'green' as const },
    { label: 'Utilizados', value: 0, icon: 'fa-thumbs-up', color: 'blue' as const }, // cyan/blue
    { label: 'Expirados', value: 3, icon: 'fa-calendar-xmark', color: 'red' as const },
  ], []);

  const filteredData = useMemo(() => {
    return MOCK_MY_COUPONS.filter(item => 
      item.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Cupons" 
        subtitle="Gerencie e acompanhe todos os cupons de desconto."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={() => setSearchTerm('')}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por token ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>
      </FilterSection>

      <TableContainer>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <TableHeader>
              <TableHead>CLIENTE</TableHead>
              <TableHead>TOKEN</TableHead>
              <TableHead className="text-center">PRODUTOS</TableHead>
              <TableHead className="text-center">DESCONTO</TableHead>
              <TableHead>VALIDADE</TableHead>
              <TableHead>STATUS</TableHead>
            </TableHeader>
            <tbody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{item.clientName}</span>
                      <span className="text-xs text-gray-500">{item.clientEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-gray-700">{item.token}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-blue-600">{item.products}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-orange-500">{item.discount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700 text-sm">{item.validity}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                       item.status === 'Expirado' ? 'bg-red-50 text-red-500 border-red-100' : 
                       item.status === 'Disponível' ? 'bg-green-50 text-green-600 border-green-100' : 
                       'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                       {item.status}
                    </span>
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
