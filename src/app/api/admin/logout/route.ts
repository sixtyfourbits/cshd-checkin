
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.set('Set-Cookie', 'admin_session=; Path=/; HttpOnly; Max-Age=0');
  return response;
}
