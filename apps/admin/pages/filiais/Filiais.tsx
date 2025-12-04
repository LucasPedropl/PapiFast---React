import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { StatsCard } from '../../../../components/common/StatsCard';
import { FilterSection } from '../../../../components/common/FilterSection';
import { Pagination } from '../../../../components/common/Pagination';

interface BranchData {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  productsCount: number;
  logoUrl?: string;
  logoPlaceholder?: string;
}

const MOCK_BRANCHES: BranchData[] = [
  { 
    id: 1, 
    name: 'UAI PDV - DEMONSTRACAO', 
    cnpj: '24.865.243/0001-50', 
    phone: '31', 
    email: 'marcelo@vlks.com.br', 
    productsCount: 572,
    logoPlaceholder: 'Uai PD'
  },
  { 
    id: 2, 
    name: 'Uaipdv - Shows', 
    cnpj: '54.884.603/0001-22', 
    phone: '(79) 98521-994', 
    email: 'UaiShow@gmail.com', 
    productsCount: 1,
    logoPlaceholder: 'Uai PD'
  },
  { 
    id: 3, 
    name: 'UAIPDV- Eventos', 
    cnpj: '39.106.040/0001-58', 
    phone: '(55) 9876-3251', 
    email: 'UaiEventos@vlks.com.br', 
    productsCount: 8,
    logoPlaceholder: 'Logo',
    logoUrl: '' // Using mock logic for color circle
  },
];

export const Filiais: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const stats = useMemo(() => {
    const totalBranches = MOCK_BRANCHES.length;
    const totalProducts = MOCK_BRANCHES.reduce((acc, curr) => acc + curr.productsCount, 0);

    return [
      { label: 'Total de Filiais', value: totalBranches, icon: 'fa-store', color: 'blue' as const },
      { label: 'Total de Produtos', value: totalProducts, icon: 'fa-box', color: 'green' as const },
      { label: 'Usuários Vinculados', value: '', icon: 'fa-user', color: 'blue' as const }, // Placeholder as per screenshot
    ];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_BRANCHES.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.cnpj.includes(searchTerm);
      return matchesSearch;
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
        title="Gestão de Filiais" 
        subtitle="Gerencie todas as suas filiais cadastradas."
        action={
          <button className="bg-brand-orange hover:bg-brand-darkYellow text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Adicionar Filial
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={handleClear}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar Filial</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>
      </FilterSection>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((branch) => (
           <div key={branch.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col group">
              <div className="p-6 flex-1">
                 <div className="flex items-start gap-4 mb-4">
                    {/* Logo */}
                    <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-md
                       ${branch.name.includes('Eventos') ? 'bg-brand-orange text-white' : 'bg-white text-brand-darkYellow border-gray-100'}
                    `}>
                       {branch.name.includes('Eventos') ? (
                          <span className="text-xs">Logo</span>
                       ) : (
                          <div className="flex items-center gap-0.5">
                            <i className="fa-solid fa-cloud text-blue-900 text-lg"></i>
                            <span className="text-blue-900 text-[8px] leading-tight">ai PD</span>
                          </div>
                       )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <h3 className="font-bold text-gray-900 text-sm uppercase leading-tight group-hover:text-brand-orange transition-colors mb-1">
                         {branch.name}
                       </h3>
                       <p className="text-xs text-gray-400 font-medium">{branch.cnpj}</p>
                    </div>
                 </div>

                 <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                       <i className="fa-solid fa-phone text-brand-orange w-4 text-center"></i>
                       {branch.phone}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                       <i className="fa-solid fa-envelope text-brand-orange w-4 text-center"></i>
                       {branch.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                       <i className="fa-solid fa-box text-brand-orange w-4 text-center"></i>
                       {branch.productsCount} produtos cadastrados
                    </div>
                 </div>
              </div>

              {/* Actions Footer */}
              <div className="bg-gray-50 border-t border-gray-100 p-3 rounded-b-2xl flex justify-end gap-2">
                 <button className="w-8 h-8 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all">
                    <i className="fa-solid fa-cart-shopping text-xs"></i>
                 </button>
                 <button className="w-8 h-8 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all">
                    <i className="fa-solid fa-pen-to-square text-xs"></i>
                 </button>
                 <button className="w-8 h-8 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-all">
                    <i className="fa-solid fa-trash text-xs"></i>
                 </button>
              </div>
           </div>
        ))}
      </div>

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