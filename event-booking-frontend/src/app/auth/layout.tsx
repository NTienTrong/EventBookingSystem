import { MainLayout } from '@/components/layout/MainLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl">
        {children}
      </div>
    </div>
  );
} 