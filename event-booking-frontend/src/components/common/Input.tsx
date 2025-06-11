// src/components/common/Input.tsx
import React from 'react';

// Tạm thời đơn giản hóa kiểu lỗi để tập trung vào UI
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // Thay vì FieldError, dùng string để hiển thị lỗi đơn giản
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  id,
  ...props
}) => {
  const inputClasses = `
    mt-1 block w-full rounded-md border
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
    p-2 shadow-sm sm:text-sm
    ${icon ? (iconPosition === 'left' ? 'pl-9' : 'pr-9') : ''}
    ${className}
  `;

  const inputId = id || props.name;

  return (
    <div className="relative">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {icon && iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" style={{ top: label ? '1.75rem' : '0.25rem' }}>
          {icon}
        </div>
      )}
      <input id={inputId} className={inputClasses} {...props} />
      {icon && iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" style={{ top: label ? '1.75rem' : '0.25rem' }}>
          {icon}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};