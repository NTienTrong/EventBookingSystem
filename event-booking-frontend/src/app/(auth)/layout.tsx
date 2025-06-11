import { MainLayout } from '@/components/layout/MainLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo hoặc tên ứng dụng */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          EventNest
        </h2>
      </div>
      {children}
    </div>
  );
} 