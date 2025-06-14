export interface BankInfo {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  qrCode: string;
}

export interface OrderData {
  id: string;
  eventId: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  amount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface PaymentInitiateResponse {
  success: boolean;
  data: {
    qrCode: string;
    bankInfo: BankInfo;
  };
}

export interface PaymentConfirmResponse {
  success: boolean;
  data: {
    orderId: string;
    status: 'PAID' | 'FAILED';
    paidAt: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
} 