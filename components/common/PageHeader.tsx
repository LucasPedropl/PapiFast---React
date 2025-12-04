import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon, action }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-fade-in-up">
    <div>
       <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
         {title}
       </h1>
       {subtitle && <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
          {icon && <i className={`fa-solid ${icon} text-brand-orange`}></i>}
          {subtitle}
       </p>}
    </div>
    {action && (
      <div>{action}</div>
    )}
  </div>
);