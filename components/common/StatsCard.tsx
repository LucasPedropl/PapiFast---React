import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'brand' | 'yellow';
  subLabel?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color = 'brand', subLabel }) => {
  const styles = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    red: { bg: 'bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-100' },
    brand: { bg: 'bg-white', text: 'text-brand-orange', iconBg: 'bg-orange-50' },
  };

  const currentStyle = styles[color];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 flex items-center gap-4 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300 ${currentStyle.iconBg} ${currentStyle.text}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 leading-none">{value}</h3>
        <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
        {subLabel && <p className="text-xs text-gray-400 mt-0.5">{subLabel}</p>}
      </div>
    </div>
  );
};