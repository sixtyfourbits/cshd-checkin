import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'cshd-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface SessionData {
  isAdmin: boolean;
}

export async function getSession() {
  return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function isAdmin() {
  const session = await getSession();
  return session.isAdmin === true;
}