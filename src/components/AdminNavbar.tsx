
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link href="/admin/dashboard" className="mr-4 hover:text-gray-300">좌석 현황</Link>
        <Link href="/admin/dashboard/logs" className="hover:text-gray-300">출입 기록</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        로그아웃
      </button>
    </nav>
  );
}
