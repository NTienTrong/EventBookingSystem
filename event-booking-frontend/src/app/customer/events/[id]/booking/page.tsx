'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  User,
  Mail,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  remaining: number;
}

interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
  ticketTypes: TicketType[];
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // TODO: Replace with actual API call
        const fakeEvent: Event = {
          id: params.id,
          name: 'Hội thảo Công nghệ 2024',
          description: 'Hội thảo về công nghệ mới nhất',
          startTime: '2024-03-15T09:00:00',
          endTime: '2024-03-15T17:00:00',
          location: 'Hà Nội',
          imageUrl: '/images/event1.jpg',
          ticketTypes: [
            {
              id: '1',
              name: 'Vé thường',
              price: 500000,
              description: 'Vé tham dự cơ bản',
              remaining: 100,
            },
            {
              id: '2',
              name: 'Vé VIP',
              price: 1000000,
              description: 'Vé tham dự với nhiều quyền lợi',
              remaining: 50,
            },
          ],
        };

        setEvent(fakeEvent);
        if (fakeEvent.ticketTypes.length > 0) {
          setSelectedTicketType(fakeEvent.ticketTypes[0].id);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params.id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!selectedTicketType) {
      alert('Vui lòng chọn loại vé');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin cá nhân');
      return;
    }

    // Create order data
    const selectedTicket = event?.ticketTypes.find(t => t.id === selectedTicketType);
    if (!selectedTicket) return;

    const orderData = {
      eventId: params.id,
      eventName: event?.name,
      ticketType: selectedTicket.name,
      quantity: quantity,
      amount: selectedTicket.price * quantity,
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      }
    };

    // Store order data in localStorage for payment page
    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Redirect to payment page
    router.push(`/customer/events/${params.id}/payment`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy thông tin sự kiện.</p>
      </div>
    );
  }

  const selectedTicket = event.ticketTypes.find(t => t.id === selectedTicketType);
  const totalAmount = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Đặt vé</h1>
        <p className="text-gray-500 mt-1">Vui lòng điền thông tin để hoàn tất đặt vé</p>
      </div>

      {/* Event Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start space-x-4">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{event.name}</h2>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(event.startTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ticket Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn vé</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại vé
              </label>
              <div className="grid gap-4">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors
                      ${selectedTicketType === ticket.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                      }`}
                    onClick={() => setSelectedTicketType(ticket.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(ticket.price)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Còn lại: {ticket.remaining} vé
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng đơn hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Loại vé:</span>
              <span className="text-gray-900">{selectedTicket?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Số lượng:</span>
              <span className="text-gray-900">{quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Đơn giá:</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(selectedTicket?.price || 0)}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Tiến hành thanh toán
          </Button>
        </div>
      </form>
    </div>
  );
} 