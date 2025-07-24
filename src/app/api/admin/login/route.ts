
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const passwordFilePath = path.join(process.cwd(), 'admin_password.txt');
  const adminPassword = await fs.readFile(passwordFilePath, 'utf-8');

  if (password === adminPassword.trim()) {
    session.isAdmin = true;
    await session.save();
    return NextResponse.json({ message: 'Login successful' });
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
