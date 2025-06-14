import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse } from '@/types/api';

// GET /api/events/[id] - Get event details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    if (!eventId) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Event ID is required', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to get event details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`);
    const data = await response.json();

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to fetch event details', data: null },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;
    const body = await request.json();

    if (!eventId) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Event ID is required', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to update event
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`, {
      method: 'PUT',
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
    console.error('Error updating event:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to update event', data: null },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    if (!eventId) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Event ID is required', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to delete event
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to delete event', data: null },
      { status: 500 }
    );
  }
} 