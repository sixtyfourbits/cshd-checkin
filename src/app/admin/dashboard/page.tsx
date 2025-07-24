
'use client';

import { useEffect, useState } from 'react';
import SeatGrid, { Seat } from '@/components/SeatGrid';

export default function AdminPage() {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/seats');
      if (res.ok) {
        const data = await res.json();
        setSeats(data);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">실시간 좌석 현황</h1>
      <SeatGrid seats={seats} />
    </div>
  );
}
