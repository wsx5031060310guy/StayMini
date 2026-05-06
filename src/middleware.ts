import { NextRequest, NextResponse } from "next/server";

// Basic Auth for /admin/* — read ADMIN_USER + ADMIN_PASSWORD from env.
// Lightweight gate so we can deploy without standing up Auth.js yet.
// If the env vars are missing in production we fail closed (503).
const REALM = 'StayMini Admin';

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse('Admin auth not configured', {
      status: 503,
      headers: { 'content-type': 'text/plain' },
    });
  }

  const header = req.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx !== -1) {
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === user && p === pass) return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
      'content-type': 'text/plain',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
