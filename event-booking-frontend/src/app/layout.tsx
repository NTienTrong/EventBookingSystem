// app/layout.tsx
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ClientLayout from './client-layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hệ thống đặt vé sự kiện',
  description: 'Đặt vé sự kiện yêu thích của bạn một cách dễ dàng',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}