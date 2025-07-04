import React from 'react';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  width?: string;
  height?: string;
  hasError?: boolean;
  label?: string;
  icon?: React.ReactNode;
};

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  required = false,
  width = 'w-full',
  height = 'py-3',
  hasError = false,
  label,
  icon,
}: InputProps) {
  return (
    <div className={`relative ${width}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {icon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full px-4 ${icon ? 'pr-10' : ''} ${height} bg-[#e9e9ff] border rounded-lg focus:ring-2 focus:ring-[#7476e7] focus:border-transparent outline-none transition-all ${
          hasError ? 'border-red-500' : 'border-gray-400'
        }`}
      />
    </div>
  );
}