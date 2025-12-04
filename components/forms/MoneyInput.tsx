import React, { useState, useEffect } from 'react';

interface MoneyInputProps {
  label: string;
  value: number; // Value in cents or float
  onChange: (value: number) => void;
}

const formatBRL = (val: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};

export const MoneyInput: React.FC<MoneyInputProps> = ({ label, value, onChange }) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    setDisplayValue(formatBRL(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/\D/g, '');
    const floatValue = Number(numericValue) / 100;
    
    onChange(floatValue);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className="block w-full rounded-md border-gray-400 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border"
      />
      {/* Hidden input for form submission if we were using native forms, mimicking current MVC behavior */}
      <input type="hidden" name={label} value={value} /> 
    </div>
  );
};