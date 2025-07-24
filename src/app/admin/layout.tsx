import { PropsWithChildren } from 'react';
import AdminNavbar from '@/components/AdminNavbar';

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <AdminNavbar />
      <main className="p-4">{children}</main>
    </div>
  );
}