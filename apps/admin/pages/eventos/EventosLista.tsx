import React, { useState, useMemo } from 'react';
import { PageHeader } from '../../../../components/common/PageHeader';
import { FilterSection } from '../../../../components/common/FilterSection';
import { Pagination } from '../../../../components/common/Pagination';
import { PublicEventCard, PublicEventData } from '../../../../components/common/PublicEventCard';

// Mock Data matching the screenshot
const MOCK_EVENTS: PublicEventData[] = [
  { id: 1, title: 'Festa Havaina', category: 'Aniversário', date: '29 nov. 2025', time: '15:00', imagePlaceholder: true },
  { id: 2, title: 'Sexta-Feira Country', category: 'Aniversário', date: '07 nov. 2025', time: '15:54', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800' }, 
  { id: 3, title: 'teste de lotes', category: 'Encontro, Networking', date: '06 nov. 2025', time: '16:57', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' }, 
  { id: 4, title: 'As Aventuras de Mike - O Hotel Assombrado', category: 'Aniversário', date: '06 dez. 2025', time: '14:30', imagePlaceholder: true },
  { id: 5, title: 'BASSZONE FESTIVAL', category: 'Aniversário', date: '29 nov. 2025', time: '22:00', imagePlaceholder: true },
  { id: 6, title: 'BASSZONE FESTIVAL', category: 'Aniversário', date: '29 nov. 2025', time: '22:00', imagePlaceholder: true },
  { id: 7, title: 'Teste 1.0', category: 'Educação', date: '21 nov. 2025', time: '15:31', imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'Rock Legends', category: 'Aniversário', date: '27 dez. 2025', time: '20:00', imagePlaceholder: true },
  { id: 9, title: 'Sexta-Feira Countrygf', category: 'E-Sports', date: '04 dez. 2025', time: '16:36', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' }, 
  { id: 10, title: 'Sexta-Feira Countrygfg', category: 'Familia e Educação', date: '04 dez. 2025', time: '17:24', imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=800' }, 
];

export const EventosLista: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('Todos os Estados');
  const [selectedCity, setSelectedCity] = useState('Todas as Cidades');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Logic
  const filteredData = useMemo(() => {
    return MOCK_EVENTS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, selectedState, selectedCity]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedState('Todos os Estados');
    setSelectedCity('Todas as Cidades');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-10 animate-fade-in-up">
      <PageHeader 
        title="Eventos em Andamento" 
        subtitle="Confira os últimos eventos cadastrados na plataforma."
      />

      {/* Filter Bar */}
      <FilterSection 
        title="Filtros e Pesquisa"
        onClear={handleClear}
      >
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Pesquisar Evento</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text"
              placeholder="Buscar por nome do evento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium placeholder-gray-400"
            />
          </div>
        </div>

        <div className="w-full md:w-48 space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase">Estado</label>
          <div className="relative">
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option>Todos os Estados</option>
              <option>SP</option>
              <option>MG</option>
              <option>RJ</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        <div className="w-full md:w-48 space-y-1">
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
        
        <div className="flex items-end pb-[1px]">
          <button 
            className="h-[42px] px-6 rounded-xl bg-brand-orange text-white font-bold text-sm shadow-md hover:bg-brand-darkYellow transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-filter"></i> Filtrar
          </button>
        </div>
      </FilterSection>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {paginatedData.map((event) => (
          <PublicEventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Pagination Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};