'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  price: number;
  remainingTickets: number;
  totalTickets: number;
  imageUrl: string;
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    remaining: number;
    total: number;
  }[];
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) throw new Error('Không tìm thấy sự kiện');
        const data = await res.json();
        setEvent(data);
        if (data.ticketTypes && data.ticketTypes.length > 0) {
          setSelectedTicketType(data.ticketTypes[0].id);
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
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleBookTicket = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    try {
      // TODO: Implement payment processing
      console.log('Processing payment...');
      // After successful payment
      router.push('/customer/orders');
    } catch (error) {
      console.error('Payment failed:', error);
    }
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
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                {format(new Date(event.startTime), 'dd/MM/yyyy', { locale: vi })}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                {format(new Date(event.startTime), 'HH:mm', { locale: vi })} - {format(new Date(event.endTime), 'HH:mm', { locale: vi })}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                {event.remainingTickets}/{event.totalTickets} vé
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sự kiện</h2>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Organizer Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin người tổ chức</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Tên:</span> {event.organizer.name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {event.organizer.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Điện thoại:</span> {event.organizer.phone}
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thanh toán</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Loại vé:</span>
                <span>{selectedTicket?.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Số lượng:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Tổng tiền:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full" onClick={handlePayment}>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 