import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && pathname.startsWith('/financeiro')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Exemplo: bloquear acesso a /admin se não for admin
  const userRole = req.cookies.get('role')?.value;
  if (pathname.startsWith('/financeiro') && userRole !== 'financeiro') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
