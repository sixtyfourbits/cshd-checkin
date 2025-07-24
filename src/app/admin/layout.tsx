
import { PropsWithChildren } from 'react';
import { isAdmin } from '@/lib/session';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';

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
