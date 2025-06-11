'use client';

import { Loader2 } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/80 shadow-2xl border border-gray-100">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    </div>
  );
}; 