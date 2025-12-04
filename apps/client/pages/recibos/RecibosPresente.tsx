import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface ReceiptData {
  id: number;
  clientName: string;
  clientEmail: string;
  status: 'Aprovado' | 'Pendente' | 'Cancelado';
  eventName: string;
  orderDate: string;
  code: string;
  itemsCount: number;
  total: string;
}

const MOCK_RECEIPTS: ReceiptData[] = [
  { id: 1, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', status: 'Aprovado', eventName: 'Rock Legends', orderDate: '01/12/2025', code: '9', itemsCount: 1, total: 'R$ 29,99' },
  { id: 2, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', status: 'Pendente', eventName: 'Festival de Verão', orderDate: '15/12/2025', code: '14', itemsCount: 3, total: 'R$ 89,90' },
  { id: 3, clientName: 'Alex', clientEmail: 'alexssandromercer@gmail.com', status: 'Cancelado', eventName: 'Show Acústico', orderDate: '20/11/2025', code: '5', itemsCount: 1, total: 'R$ 25,00' },
];

export const RecibosPresente: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedEvent, setSelectedEvent] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = useMemo(() => {
    return MOCK_RECEIPTS.filter(item => {
      const matchesSearch = 
        item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.code.includes(searchTerm);
      const matchesStatus = selectedStatus === 'Todos' || item.status === selectedStatus;
      const matchesEvent = selectedEvent === 'Todos' || item.eventName === selectedEvent;
      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [searchTerm, selectedStatus, selectedEvent]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedStatus('Todos');
    setSelectedEvent('Todos');
    setCurrentPage(1);
  };

  const uniqueEvents = Array.from(new Set(MOCK_RECEIPTS.map(r => r.eventName)));

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Recibos de Presentes" 
        subtitle="Acompanhe os recibos e status dos presentes dos seus eventos."
      />

      <FilterSection 
        title="Pesquisar"
        icon="fa-search"
        onClear={handleClear}
      >
        <div className="flex-1 w-full">
           <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome, e-mail, código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-500">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos</option>
              <option>Aprovado</option>
              <option>Pendente</option>
              <option>Cancelado</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-48">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-gray-500">Evento</label>
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos</option>
              {uniqueEvents.map(evt => <option key={evt} value={evt}>{evt}</option>)}
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>
      </FilterSection>

      <TableContainer>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <TableHeader>
              <TableHead>CLIENTE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>EVENTO</TableHead>
              <TableHead>DATA DO PEDIDO</TableHead>
              <TableHead>CÓDIGO</TableHead>
              <TableHead className="text-center">Nº PRODUTOS</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead className="text-right">AÇÕES</TableHead>
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
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        item.status === 'Aprovado' ? 'bg-green-100 text-green-700 border-green-200' : 
                        item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                        'bg-red-100 text-red-700 border-red-200'
                     }`}>
                        {item.status}
                     </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-700">{item.eventName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-700">{item.orderDate}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-500">{item.code}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-gray-700">{item.itemsCount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-gray-900">{item.total}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                       <i className="fa-regular fa-eye"></i> Detalhes
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">Nenhum recibo encontrado.</td>
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
