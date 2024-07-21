import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ADMIN_SIGNIN_PATH = '/admin/admin-signin';
const ADMIN_PATH = '/admin';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (url.pathname === ADMIN_SIGNIN_PATH) {
    if (token) {
      return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
    }
  } else if (url.pathname.startsWith(ADMIN_PATH)) {
    if (!token && url.pathname !== ADMIN_SIGNIN_PATH) {
      return NextResponse.redirect(new URL(ADMIN_SIGNIN_PATH, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-signin', '/admin', '/admin/:path*'],
};
