'use client';

import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-gray-600">Đang tải...</p>
      </div>
    </div>
  );
}; 