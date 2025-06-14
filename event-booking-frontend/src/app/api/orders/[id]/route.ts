import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse, OrderData } from '@/types/payment';

// GET /api/orders/[id] - Get order details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Order ID is required', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to get order details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`);
    const data = await response.json();

    return NextResponse.json<ApiResponse<OrderData>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to fetch order details', data: null },
      { status: 500 }
    );
  }
} 