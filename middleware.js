import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token && url.pathname === '/admin/admin-signin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (!token && url.pathname.startsWith('/admin') && url.pathname !== '/admin/admin-signin') {
    return NextResponse.redirect(new URL('/admin/admin-signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-signin', '/admin', '/admin/:path*'],
};
