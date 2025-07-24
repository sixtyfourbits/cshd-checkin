
import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';
import { isAdmin } from '@/lib/session';

export default async function AdminLayout({ children }: PropsWithChildren) {
  if (!await isAdmin()) {
    redirect('/admin/login');
  }

  return (
    <div>
      <AdminNavbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
