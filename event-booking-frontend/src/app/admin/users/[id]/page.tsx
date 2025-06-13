'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Calendar, ShoppingBag, Shield } from 'lucide-react';
import { Button, Card } from '@/components/common';

// Mock data - will be replaced with API call
const mockUser = {
  id: '1',
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0123456789',
  role: 'customer',
  status: 'active',
  joinedDate: '2024-01-15',
  totalOrders: 5,
  address: '123 Đường ABC, Quận XYZ, TP.HCM',
  lastLogin: '2024-03-15 14:30:00',
  orders: [
    {
      id: '1',
      date: '2024-03-10',
      total: 1500000,
      status: 'completed',
    },
    // Add more orders...
  ],
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchUser = async () => {
    //   const response = await fetch(`/api/users/${params.id}`);
    //   const data = await response.json();
    //   setUser(data);
    // };
    // fetchUser();
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Chi tiết người dùng
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{user.fullName}</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Ngày tham gia</p>
                  <p className="text-sm font-medium">
                    {new Date(user.joinedDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Vai trò</p>
                  <p className="text-sm font-medium">
                    {user.role === 'admin' ? 'Admin' : 'Khách hàng'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ShoppingBag className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                  <p className="text-sm font-medium">{user.totalOrders}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Địa chỉ</h3>
            <p className="text-gray-600">{user.address}</p>
          </Card>
        </div>

        {/* Status Card */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trạng thái tài khoản</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <span
                  className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : user.status === 'inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status === 'active'
                    ? 'Hoạt động'
                    : user.status === 'inactive'
                    ? 'Không hoạt động'
                    : 'Đã khóa'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Đăng nhập lần cuối</p>
                <p className="text-sm font-medium">
                  {new Date(user.lastLogin).toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.date).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.total.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 