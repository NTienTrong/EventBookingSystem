// src/components/common/Modal.tsx
'use client'
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react'; // Icon đóng modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string; // Để thêm class tùy chỉnh vào modal content
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Đóng modal khi nhấn Esc hoặc click ra ngoài
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className={`relative rounded-lg bg-white p-6 shadow-2xl max-w-lg w-full ${className}
        transform transition-all duration-300 ease-out animate-modal-in`} // Thêm animation
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
        {title && (
          <h3 className="mb-4 text-2xl font-semibold text-gray-800 border-b pb-2">
            {title}
          </h3>
        )}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};