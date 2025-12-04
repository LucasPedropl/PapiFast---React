import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { TableContainer, TableHeader, TableRow, TableHead, TableCell, Badge } from '../../../../components/common/Table';
import { Pagination } from '../../../../components/common/Pagination';

interface StaffData {
  id: number;
  name: string;
  email: string;
  status: 'Ativo' | 'Desativado';
  filiais: string[];
  contact: string;
  registerDate: string;
}

const MOCK_STAFF: StaffData[] = [
  { id: 1, name: 'Marcelo', email: 'marcelo@vlks.com.br', status: 'Ativo', filiais: ['UAI PDV - DEMONSTRACAO', 'FILIAL DEMONSTRACAO', 'testando123', 'Uaipdv - Shows', 'UAIPDV- Eventos'], contact: '(31) 97253-2104', registerDate: '28/10/2025' },
];

export const UsuariosFuncionarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const stats = useMemo(() => {
    return [
      { label: 'Total de Funcionários', value: MOCK_STAFF.length, icon: 'fa-user-tie', color: 'blue' as const },
      { label: 'Funcionários Ativos', value: MOCK_STAFF.filter(c => c.status === 'Ativo').length, icon: 'fa-user-check', color: 'green' as const },
      { label: 'Funcionários Inativos', value: MOCK_STAFF.filter(c => c.status === 'Desativado').length, icon: 'fa-user-xmark', color: 'red' as const },
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_STAFF.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Gestão de Funcionários" 
        subtitle="Gerencie e visualize os funcionários da sua filial."
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Cadastrar Funcionário
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={() => setSearchTerm('')}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar Funcionário</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome, email ou contato..."
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
               <TableHead>NOME</TableHead>
               <TableHead>EMAIL</TableHead>
               <TableHead>STATUS</TableHead>
               <TableHead>FILIAIS</TableHead>
               <TableHead>CONTATO</TableHead>
               <TableHead>DATA DO CADASTRO</TableHead>
               <TableHead className="text-right">OPÇÕES</TableHead>
             </TableHeader>
             <tbody>
               {paginatedData.map((staff) => (
                 <TableRow key={staff.id}>
                   <TableCell><span className="font-medium text-gray-700">{staff.name}</span></TableCell>
                   <TableCell><span className="text-gray-600">{staff.email}</span></TableCell>
                   <TableCell>
                      <Badge color={staff.status === 'Ativo' ? 'green' : 'red'}>{staff.status}</Badge>
                   </TableCell>
                   <TableCell>
                     <div className="flex flex-wrap gap-1 max-w-xs">
                       {staff.filiais.map((f, idx) => (
                         <span key={idx} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-200">
                           {f}
                         </span>
                       ))}
                     </div>
                   </TableCell>
                   <TableCell><span className="text-gray-600 text-sm">{staff.contact}</span></TableCell>
                   <TableCell><span className="text-gray-600">{staff.registerDate}</span></TableCell>
                   <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all">
                           <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-all">
                           <i className="fa-solid fa-user-gear text-xs"></i>
                        </button>
                      </div>
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