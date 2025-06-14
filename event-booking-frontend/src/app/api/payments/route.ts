import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse, BankInfo } from '@/types/payment';

// GET /api/payments/banks - Get list of available banks
export async function GET(request: NextRequest) {
  try {
    // TODO: Call backend API to get bank list
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banks`);
    const data = await response.json();

    return NextResponse.json<ApiResponse<BankInfo[]>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching banks:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to fetch banks', data: null },
      { status: 500 }
    );
  }
}

// POST /api/payments/initiate - Initiate payment
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

    // TODO: Call backend API to initiate payment
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, bankId }),
    });
    const data = await response.json();

    return NextResponse.json<ApiResponse<{
      qrCode: string;
      bankInfo: BankInfo;
    }>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to initiate payment', data: null },
      { status: 500 }
    );
  }
} 