
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const passwordFilePath = path.join(process.cwd(), 'admin_password.txt');
  const adminPassword = await fs.readFile(passwordFilePath, 'utf-8');

  if (password === adminPassword.trim()) {
    const response = NextResponse.json({ message: 'Login successful' });
    // admin_session 쿠키 설정 (테스트를 위해 httpOnly, secure 제거)
    response.headers.set('Set-Cookie', `admin_session=${adminPassword.trim()}; Path=/`);
    // cshd-session 쿠키 강제 삭제 시도
    response.headers.append('Set-Cookie', 'cshd-session=; Path=/; Max-Age=0');
    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
