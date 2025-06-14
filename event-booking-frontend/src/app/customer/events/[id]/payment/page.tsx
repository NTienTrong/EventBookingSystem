'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  ArrowLeft,
  Lock,
  CheckCircle,
  QrCode,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/common';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface OrderData {
  eventId: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  amount: number;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
}

interface BankInfo {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  qrCode: string;
}

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [showQR, setShowQR] = useState(false);
  const [paymentTimeout, setPaymentTimeout] = useState<number>(900); // 15 minutes in seconds
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // TODO: Call API to get order data
        // const response = await fetch(`/api/orders/${params.id}`);
        // const data = await response.json();
        // setOrderData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setError('Không thể tải thông tin đơn hàng');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [params.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQR && paymentTimeout > 0) {
      timer = setInterval(() => {
        setPaymentTimeout(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQR, paymentTimeout]);

  const handlePayment = async () => {
    if (processing) return;
    
    setProcessing(true);
    setError(null);

    try {
      if (!selectedBank) {
        throw new Error('Vui lòng chọn ngân hàng thanh toán');
      }

      // TODO: Call API to initiate payment
      // const response = await fetch('/api/payments/initiate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     orderId: params.id,
      //     bankId: selectedBank,
      //   }),
      // });
      // const data = await response.json();
      
      setShowQR(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi xử lý thanh toán');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // TODO: Call API to confirm payment
      // const response = await fetch('/api/payments/confirm', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     orderId: params.id,
      //     bankId: selectedBank,
      //   }),
      // });
      // const data = await response.json();

      // Clear order data from localStorage
      localStorage.removeItem('currentOrder');
      // Redirect to success page
      router.push(`/customer/events/${params.id}/booking/success`);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setError('Có lỗi xảy ra khi xác nhận thanh toán');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy thông tin đơn hàng.</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Quay lại
        </Button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
        <p className="text-gray-500 mt-1">Chọn ngân hàng để thanh toán</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Sự kiện:</span>
            <span className="font-medium">{orderData.eventName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loại vé:</span>
            <span className="font-medium">{orderData.ticketType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Số lượng:</span>
            <span className="font-medium">{orderData.quantity}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Tổng tiền:</span>
              <span className="text-lg font-bold text-blue-600">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(orderData.amount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn ngân hàng</h2>
          <div className="grid gap-4">
            {/* TODO: Fetch bank list from API */}
            {/* {banks.map((bank) => (
              <div
                key={bank.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors
                  ${selectedBank === bank.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => setSelectedBank(bank.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{bank.name}</h3>
                    <p className="text-sm text-gray-500">
                      {bank.accountNumber} - {bank.accountName}
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
          <Lock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Thông tin thanh toán của bạn được bảo mật. Vui lòng kiểm tra kỹ thông tin trước khi chuyển khoản.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handlePayment}
          disabled={processing || !selectedBank}
          className="w-full flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <QrCode className="h-5 w-5" />
              Hiển thị mã QR
            </>
          )}
        </Button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quét mã QR để thanh toán
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Thời gian còn lại: {formatTime(paymentTimeout)}
              </p>
              
              {/* TODO: Display QR code from API response */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                {/* <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                /> */}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {/* TODO: Display bank info from API response */}
                {/* <p>Ngân hàng: {selectedBank?.name}</p>
                <p>Số tài khoản: {selectedBank?.accountNumber}</p>
                <p>Tên tài khoản: {selectedBank?.accountName}</p> */}
                <p className="font-semibold text-blue-600">
                  Số tiền: {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(orderData.amount)}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handlePaymentSuccess}
                  className="w-full"
                >
                  Tôi đã thanh toán
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQR(false)}
                  className="w-full"
                >
                  Hủy
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Vui lòng chuyển khoản đúng số tiền để tránh lỗi
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 