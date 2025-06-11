// app/layout.tsx
import './globals.css'; // Import global CSS của bạn

// Bạn có thể thêm meta data tại đây nếu muốn
export const metadata = {
  title: 'EventNest - Đặt Vé Sự Kiện Dễ Dàng',
  description: 'Khám phá và đặt vé cho các sự kiện yêu thích của bạn.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}