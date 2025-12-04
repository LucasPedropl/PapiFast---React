import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface VoucherData {
  id: number;
  clientName: string;
  clientEmail: string;
  status: 'Não Usado' | 'Usado';
  validity: string;
  code: string;
  available: string;
  total: string;
}

const MOCK_VOUCHERS: VoucherData[] = [
  { id: 1, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', status: 'Não Usado', validity: '10/01/2026 23:59', code: '13SM-291V25', available: 'R$ 25,00', total: 'R$ 25,00' },
  { id: 2, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', status: 'Não Usado', validity: '09/01/2026 23:59', code: '13SM-371V10', available: 'R$ 10,00', total: 'R$ 10,00' },
];

export const Voucher: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const stats = useMemo(() => {
    const totalVouchers = MOCK_VOUCHERS.length;
    const activeVouchers = MOCK_VOUCHERS.filter(v => v.status === 'Não Usado').length;
    
    // Simple sum calculation for demo
    const availableVal = MOCK_VOUCHERS.reduce((acc, curr) => {
        const val = parseFloat(curr.available.replace('R$', '').replace(',', '.'));
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const usedVal = MOCK_VOUCHERS.reduce((acc, curr) => {
        const total = parseFloat(curr.total.replace('R$', '').replace(',', '.'));
        const avail = parseFloat(curr.available.replace('R$', '').replace(',', '.'));
        return acc + (total - avail);
    }, 0);

    return [
      { label: 'Total de Vouchers', value: totalVouchers, icon: 'fa-ticket', color: 'blue' as const },
      { label: 'Vouchers Ativos', value: activeVouchers, icon: 'fa-check-circle', color: 'green' as const },
      { label: 'Valor Disponível', value: `R$ ${availableVal.toFixed(2).replace('.', ',')}`, icon: 'fa-wallet', color: 'blue' as const },
      { label: 'Valor Utilizado', value: `R$ ${usedVal.toFixed(2).replace('.', ',')}`, icon: 'fa-cart-shopping', color: 'yellow' as const },
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_VOUCHERS.filter(item => {
      return item.code.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClear = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Vouchers" 
        subtitle="Gerencie e monitore seus vouchers de crédito"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={handleClear}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por cliente ou voucher..."
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
              <TableHead><i className="fa-solid fa-user mr-2 text-gray-300"></i>CLIENTE</TableHead>
              <TableHead><i className="fa-solid fa-flag mr-2 text-gray-300"></i>STATUS</TableHead>
              <TableHead><i className="fa-regular fa-calendar mr-2 text-gray-300"></i>VALIDADE</TableHead>
              <TableHead><i className="fa-solid fa-ticket mr-2 text-gray-300"></i>VOUCHER</TableHead>
              <TableHead className="text-right"><i className="fa-solid fa-wallet mr-2 text-gray-300"></i>DISPONÍVEL</TableHead>
              <TableHead className="text-right"><i className="fa-solid fa-money-bill mr-2 text-gray-300"></i>VALOR TOTAL</TableHead>
              <TableHead className="text-right"><i className="fa-solid fa-gear mr-2 text-gray-300"></i>AÇÕES</TableHead>
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
                    <Badge color={item.status === 'Não Usado' ? 'green' : 'gray'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700 font-medium">{item.validity}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      {item.code}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-gray-900">{item.available}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium text-gray-500">{item.total}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100 flex items-center justify-center transition-all ml-auto">
                       <i className="fa-solid fa-paper-plane text-xs"></i>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">Nenhum voucher encontrado.</td>
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
