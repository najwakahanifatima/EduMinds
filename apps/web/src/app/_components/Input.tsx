import React from 'react';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  width?: string;
  height?: string;
  hasError?: boolean;
  label?: string;
};

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  width = 'w-full',
  height = 'py-3',
  hasError = false,
  label,
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`${width} px-4 ${height} bg-[#e9e9ff] border rounded-lg focus:ring-2 focus:ring-[#7476e7] focus:border-transparent outline-none transition-all ${
          hasError ? 'border-red-500' : 'border-gray-400'
        }`}
      />
    </div>
  );
}