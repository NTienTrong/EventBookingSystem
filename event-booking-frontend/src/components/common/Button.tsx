// src/components/common/Button.tsx
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react'; // Icon cho trạng thái loading

// Định nghĩa các biến thể màu sắc
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
// Định nghĩa các kích thước
type ButtonSize = 'sm' | 'md' | 'lg';

// 1. Định nghĩa các props cơ bản của Button
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode; // Có thể là một Lucide icon component hoặc bất kỳ JSX nào
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

// 2. Tạo một kiểu polymorphic
type PolymorphicButtonProps<T extends React.ElementType = 'button'> =
  BaseButtonProps &
  {
    as?: T;
  } & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'className' | 'children' | 'disabled'>;

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
    case 'outline':
      return 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400';
    case 'ghost':
      return 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200';
    default:
      return 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
  }
};

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'md':
      return 'px-4 py-2 text-base';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
};

export const Button = React.forwardRef(function Button<T extends React.ElementType = 'button'>(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    iconPosition = 'left',
    className = '',
    disabled,
    as,
    ...props
  }: PolymorphicButtonProps<T>,
  ref: React.ForwardedRef<any>
) {
  const Component = as || 'button';

  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed'; // Lớp disabled này sẽ được thêm mặc định

  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  const isDisabled = isLoading || disabled;

  const isButtonElement = Component === 'button';
  const isInteractiveElement = isButtonElement || Component === 'a'; // Kiểm tra cả 'a' và 'button'

  // Xây dựng chuỗi className cuối cùng một cách an toàn
  let finalClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  // Nếu isDisabled và không phải là button, thêm các lớp cho hiệu ứng disabled
  if (isDisabled && !isButtonElement) {
    finalClassName += ' pointer-events-none opacity-50'; // Thêm lớp disabled cho non-button
  }

  return (
    <Component
      ref={ref}
      className={finalClassName} // Chỉ sử dụng finalClassName ở đây
      // Nếu là button và isDisabled, truyền thuộc tính disabled
      {...(isButtonElement && isDisabled ? { disabled: true } : {})}
      // Thêm các thuộc tính ARIA và tabindex cho các phần tử không phải button nhưng bị disabled
      {...(isDisabled && !isButtonElement ? { 'aria-disabled': true, tabIndex: -1 } : {})}
      {...props}
      onClick={(e: React.MouseEvent<any>) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </Component>
  );
});

Button.displayName = 'Button';