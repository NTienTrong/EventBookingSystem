'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Event } from '@/types/event';
import { TicketType } from '@/types/ticket';
import { OrderRequest, OrderTicket } from '@/types/order';
import { eventApi } from '@/api/event';
import { ticketApi } from '@/api/ticket';
import { orderApi } from '@/api/booking';
import { customersApi } from '@/services/api/customers';
import { UserDTO } from '@/types/user';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Number(params.id);

  const [event, setEvent] = useState<Event | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<OrderTicket[]>([]);
  const [userInfo, setUserInfo] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [eventResponse, ticketTypesResponse, user] = await Promise.all([
          eventApi.getEventById(eventId),
          ticketApi.getAllTicketTypes({ eventId }),
          customersApi.getProfile()
        ]);
        setEvent(eventResponse.data);
        setTicketTypes(ticketTypesResponse.data);
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Không thể tải thông tin sự kiện hoặc tài khoản');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [eventId]);

  const handleQuantityChange = (ticketTypeId: number, quantity: number) => {
    setSelectedTickets(prev => {
      const existing = prev.find(t => t.ticketTypeId === ticketTypeId);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(t => t.ticketTypeId !== ticketTypeId);
        }
        return prev.map(t => t.ticketTypeId === ticketTypeId ? { ...t, quantity } : t);
      }
      return [...prev, { ticketTypeId, quantity }];
    });
  };

  const calculateTotal = () => {
    return selectedTickets.reduce((total, ticket) => {
      const ticketType = ticketTypes.find(t => t.id === ticket.ticketTypeId);
      return total + (ticketType?.price || 0) * ticket.quantity;
    }, 0);
  };

  const handleBook = () => {
    if (selectedTickets.length === 0) {
      toast.error('Vui lòng chọn ít nhất một loại vé');
      return;
    }
    if (!userInfo) {
      toast.error('Không tìm thấy thông tin tài khoản');
      return;
    }
    const totalAmount = calculateTotal();
    const orderData: OrderRequest = {
      eventId,
      customerId: userInfo.id,
      tickets: selectedTickets,
      customerName: userInfo.fullName,
      customerEmail: userInfo.email,
      customerPhone: userInfo.phoneNumber,
      totalAmount: Number(totalAmount),
      paymentMethod: 'MB'
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    router.push(`/customer/events/${eventId}/payment`);
  };

  const safeDate = (dateStr?: string) => {
    const d = dateStr ? new Date(dateStr) : null;
    return d && !isNaN(d.getTime()) ? d : null;
  };

  if (loading || !userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-4">Đang tải thông tin tài khoản...</div>
        <pre className="bg-gray-100 p-2 rounded text-xs text-left w-full max-w-xl overflow-x-auto">{JSON.stringify(userInfo, null, 2)}</pre>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Không tìm thấy thông tin sự kiện</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Đặt vé - {event.name}</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={event.imageUrl || '/images/event-default.jpg'}
                alt={event.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Thời gian:</span>{' '}
                  {safeDate(event.startTime)
                    ? format(safeDate(event.startTime)!, 'dd/MM/yyyy HH:mm', { locale: vi })
                    : 'Chưa có'}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Địa điểm:</span> {event.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Mô tả:</span> {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Chọn vé</h2>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => router.push('/customer/events')}
            >
              Quay lại sự kiện
            </button>
          </div>
          <div className="space-y-4 mb-8">
            {ticketTypes.map((ticketType) => (
              <div key={ticketType.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{ticketType.name}</h3>
                  <p className="text-gray-600">{ticketType.description}</p>
                  <p className="text-blue-600 font-medium">
                    {ticketType.price?.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(ticketType.id!, 
                        (selectedTickets.find(t => t.ticketTypeId === ticketType.id)?.quantity || 0) - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {selectedTickets.find(t => t.ticketTypeId === ticketType.id)?.quantity || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(ticketType.id!, 
                        (selectedTickets.find(t => t.ticketTypeId === ticketType.id)?.quantity || 0) + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Tổng tiền:</span>
              <span className="text-2xl font-bold text-blue-600">
                {calculateTotal().toLocaleString('vi-VN')} VNĐ
              </span>
            </div>

            <Button
              type="button"
              disabled={submitting || selectedTickets.length === 0 || !userInfo}
              className="w-full"
              onClick={handleBook}
            >
              {submitting ? 'Đang xử lý...' : 'Đặt vé'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 