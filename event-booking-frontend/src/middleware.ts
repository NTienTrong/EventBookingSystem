import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /login to /auth/login
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect /register to /auth/register
  if (request.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  // Redirect /forgot-password to /auth/forgot-password
  if (request.nextUrl.pathname === '/forgot-password') {
    return NextResponse.redirect(new URL('/auth/forgot-password', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/forgot-password'],
}; 