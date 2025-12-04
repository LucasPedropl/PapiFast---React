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
  status: 'Não Usado' | 'Usado' | 'Vencido';
  validade: string;
  voucherCode: string;
  disponivel: string;
  valorTotal: string;
}

const MOCK_VOUCHERS: VoucherData[] = [
  { id: 1, clientName: 'pedro', clientEmail: 'pedrolucasmota2005@gmail.com', status: 'Não Usado', validade: '07/11/2025 15:45', voucherCode: '13SM-1V20', disponivel: 'R$ 20,00', valorTotal: 'R$ 20,00' },
  { id: 2, clientName: 'Alex', clientEmail: 'Alexssandromercer@gmail.com', status: 'Não Usado', validade: '10/01/2026 23:59', voucherCode: '13SM-291V25', disponivel: 'R$ 25,00', valorTotal: 'R$ 25,00' },
  { id: 3, clientName: 'Alex', clientEmail: 'Alexssandromercer@gmail.com', status: 'Não Usado', validade: '09/01/2026 23:59', voucherCode: '13SM-371V10', disponivel: 'R$ 10,00', valorTotal: 'R$ 10,00' },
  { id: 4, clientName: 'João Silva', clientEmail: 'joao.s@email.com', status: 'Usado', validade: '05/12/2024 10:00', voucherCode: '13SM-555V50', disponivel: 'R$ 0,00', valorTotal: 'R$ 50,00' },
];

export const Voucher: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos os Status');
  const [selectedFilial, setSelectedFilial] = useState('--- Todas as Filiais ---');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const stats = useMemo(() => {
    const total = MOCK_VOUCHERS.length;
    const active = MOCK_VOUCHERS.filter(v => v.status === 'Não Usado').length;
    // Mocking currency calculation
    const totalValue = MOCK_VOUCHERS.reduce((acc, curr) => {
        const val = parseFloat(curr.disponivel.replace('R$', '').replace(',', '.').trim());
        return acc + val;
    }, 0);
    const usedValue = MOCK_VOUCHERS.reduce((acc, curr) => {
        const total = parseFloat(curr.valorTotal.replace('R$', '').replace(',', '.').trim());
        const avail = parseFloat(curr.disponivel.replace('R$', '').replace(',', '.').trim());
        return acc + (total - avail);
    }, 0);

    return [
      { label: 'Total de Vouchers', value: total, icon: 'fa-ticket', color: 'blue' as const },
      { label: 'Vouchers Ativos', value: active, icon: 'fa-check-circle', color: 'green' as const },
      { label: 'Valor Disponível', value: `R$ ${totalValue.toFixed(2).replace('.', ',')}`, icon: 'fa-money-bill-wave', color: 'blue' as const }, // Using blue/cyan
      { label: 'Valor Utilizado', value: `R$ ${usedValue.toFixed(2).replace('.', ',')}`, icon: 'fa-cart-arrow-down', color: 'yellow' as const },
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_VOUCHERS.filter(item => {
      const matchesSearch = item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.voucherCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos os Status' || item.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

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

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Vouchers" 
        subtitle="Gerencie e monitore seus vouchers de crédito"
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Adicionar Voucher
          </button>
        }
      />

      {/* Stats */}
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
              placeholder="Buscar por cliente ou voucher..."
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
              <option>Não Usado</option>
              <option>Usado</option>
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
              <option>Matriz</option>
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
                        <span className="text-xs text-gray-400">{item.clientEmail}</span>
                      </div>
                   </TableCell>
                   <TableCell>
                      <Badge color={item.status === 'Não Usado' ? 'green' : 'gray'}>
                        {item.status}
                      </Badge>
                   </TableCell>
                   <TableCell>
                      <span className="text-gray-700 font-medium">{item.validade}</span>
                   </TableCell>
                   <TableCell>
                      <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                        {item.voucherCode}
                      </span>
                   </TableCell>
                   <TableCell className="text-right">
                      <span className="font-bold text-gray-900">{item.disponivel}</span>
                   </TableCell>
                   <TableCell className="text-right">
                      <span className="font-medium text-gray-500">{item.valorTotal}</span>
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
                  <td colSpan={7} className="py-12 text-center text-gray-400">Nenhum voucher encontrado.</td>
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