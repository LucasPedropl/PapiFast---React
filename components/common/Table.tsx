import React, { ReactNode } from 'react';

export const TableContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in-up flex flex-col">
    {children}
  </div>
);

export const TableHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <thead className="bg-gray-50 border-b border-gray-200">
    <tr>{children}</tr>
  </thead>
);

export const TableRow: React.FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <tr 
    onClick={onClick}
    className={`border-b border-gray-100 last:border-0 transition-colors group ${onClick ? 'cursor-pointer hover:bg-orange-50/30' : 'hover:bg-gray-50/50'}`}
  >
    {children}
  </tr>
);

export const TableHead: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <th className={`px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

export const TableCell: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`px-6 py-4 text-sm text-gray-700 whitespace-nowrap ${className}`}>
    {children}
  </td>
);

export const Badge: React.FC<{ children: ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' | 'gray' | 'orange' }> = ({ children, color = 'gray' }) => {
  const styles = {
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    orange: 'bg-orange-100 text-brand-deepOrange border-orange-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${styles[color]}`}>
      {children}
    </span>
  );
};