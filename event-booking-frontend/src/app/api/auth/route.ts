import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse } from '@/types/api';

// POST /api/auth/login - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'Missing required fields', data: null },
        { status: 400 }
      );
    }

    // TODO: Call backend API to login
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, message: 'Failed to login', data: null },
      { status: 500 }
    );
  }
} 