import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div>
      <AdminNavbar />
      <main className="p-4">{children}</main>
    </div>
  );
}