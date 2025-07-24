// src/lib/session.ts - Simplified session logic for debugging

import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

export interface SessionData {
  isAdmin: boolean;
}

export async function isAdmin(): Promise<boolean> {
  const adminPasswordFilePath = path.join(process.cwd(), 'admin_password.txt');
  let storedPassword = '';
  try {
    storedPassword = (await fs.readFile(adminPasswordFilePath, 'utf-8')).trim();
  } catch (error) {
    console.error('Failed to read admin_password.txt', error);
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (sessionCookie && sessionCookie.value === storedPassword) {
    return true;
  }
  return false;
}