import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the user has a valid session token
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  const isPublicPath = path === '/login';

  // If the user is authenticated and trying to access the login page, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register'], // Add your protected routes here
  // '/opportunities2/:path*'
};
