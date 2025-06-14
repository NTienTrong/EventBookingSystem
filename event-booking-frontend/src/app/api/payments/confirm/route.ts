import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse, PaymentConfirmResponse } from '@/types/payment';

// POST /api/payments/confirm - Confirm payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, bankId } = body;

    if (!orderId || !bankId) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Missing required fields', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to confirm payment
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, bankId }),
    });
    const data = await response.json();

    return NextResponse.json<ApiResponse<PaymentConfirmResponse['data']>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to confirm payment', data: null },
      { status: 500 }
    );
  }
} 