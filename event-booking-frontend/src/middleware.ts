import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get stored auth data
  const userCookie = request.cookies.get('user');
  const tokenCookie = request.cookies.get('token');

  // Debug logs
  console.log('=== Middleware Debug ===');
  console.log('Current path:', request.nextUrl.pathname);
  console.log('Request URL:', request.url);
  console.log('Cookie header:', request.headers.get('cookie'));
  console.log('User cookie:', userCookie?.value);
  console.log('Token cookie:', tokenCookie?.value);

  // Check if path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Checking admin access for path:', request.nextUrl.pathname);

    // If no user or token, redirect to login
    if (!userCookie?.value || !tokenCookie?.value) {
      console.log('No auth cookies found, redirecting to login');
      console.log('Missing cookies:', {
        user: !userCookie?.value,
        token: !tokenCookie?.value
      });
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      console.log('Redirecting to:', loginUrl.toString());
      return NextResponse.redirect(loginUrl);
    }

    // If user exists but not admin, redirect to home
    try {
      const userData = JSON.parse(userCookie.value);
      console.log('Parsed user data:', userData);
      console.log('User role:', userData.role);
      
      if (!userData.role || userData.role !== 'admin') {
        console.log('User is not admin, redirecting to home');
        console.log('User role check failed:', {
          hasRole: !!userData.role,
          isAdmin: userData.role === 'admin'
        });
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      console.log('Admin access granted for path:', request.nextUrl.pathname);
      return NextResponse.next();
    } catch (error) {
      console.error('Error parsing user data:', error);
      console.error('Invalid user cookie value:', userCookie?.value);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Handle auth routes redirects
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (request.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  if (request.nextUrl.pathname === '/forgot-password') {
    return NextResponse.redirect(new URL('/auth/forgot-password', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/dashboard',
    '/admin/:path*',
    '/login',
    '/register',
    '/forgot-password'
  ],
}; 