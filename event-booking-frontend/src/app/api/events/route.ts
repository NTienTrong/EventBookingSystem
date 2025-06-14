import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse, PaginatedResponse } from '@/types/api';

// GET /api/events - Get list of events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    // TODO: Call backend API to get events
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events?page=${page}&limit=${limit}&search=${search}&category=${category}&status=${status}`
    );
    const data = await response.json();

    return NextResponse.json<ApiResponse<PaginatedResponse<any>>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to fetch events', data: null },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Call backend API to create event
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to create event', data: null },
      { status: 500 }
    );
  }
} 