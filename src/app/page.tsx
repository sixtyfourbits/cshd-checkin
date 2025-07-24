
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckInForm() {
  const searchParams = useSearchParams();
  const seat_id = searchParams.get('seat');

  const [formData, setFormData] = useState({ grade: '', class_number: '', student_number: '', name: '' });
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!seat_id) {
      setIsLoading(false);
      return;
    }

    const fetchSeatStatus = async () => {
      try {
        const res = await fetch(`/api/seats/${seat_id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch seat status');
        }
        const seat = await res.json();
        setIsCheckedIn(seat.is_occupied);

        if (!seat.is_occupied) {
          localStorage.removeItem(`seat-${seat_id}`);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeatStatus();
  }, [seat_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/check-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, seat_id }),
    });

    if (res.ok) {
      setIsCheckedIn(true);
      localStorage.setItem(`seat-${seat_id}`, 'occupied');
      alert('청송학당 입실 완료!');
    } else {
      const { error } = await res.json();
      setError(error);
      alert(`오류: ${error}`);
    }
  };

  const handleCheckOut = async () => {
    setError('');
    const res = await fetch('/api/check-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seat_id }),
    });

    if (res.ok) {
      setIsCheckedIn(false);
      localStorage.removeItem(`seat-${seat_id}`);
      setFormData({ grade: '', class_number: '', student_number: '', name: '' });
      alert('퇴실 완료!');
    } else {
      const { error } = await res.json();
      setError(error);
      alert(`오류: ${error}`);
    }
  };

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (!seat_id) {
    return <div className="text-center text-red-500">잘못된 접근입니다. QR 코드를 통해 접속해주세요.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">좌석 {seat_id}번</h1>
      {isCheckedIn ? (
        <div className="text-center">
          <p className="text-lg mb-4">이용 중인 좌석입니다.</p>
          <button onClick={handleCheckOut} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            퇴실하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleCheckIn}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select name="grade" onChange={handleInputChange} className="p-2 border rounded-md" required>
              <option value="">학년</option>
              {[1, 2, 3].map(g => <option key={g} value={g}>{g}학년</option>)}
            </select>
            <select name="class_number" onChange={handleInputChange} className="p-2 border rounded-md" required>
              <option value="">반</option>
              {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}반</option>)}
            </select>
            <select name="student_number" onChange={handleInputChange} className="p-2 border rounded-md" required>
              <option value="">번호</option>
              {[...Array(35)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}번</option>)}
            </select>
          </div>
          <input type="text" name="name" placeholder="이름" onChange={handleInputChange} className="w-full p-2 border rounded-md mb-4" required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            입실하기
          </button>
        </form>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckInForm />
    </Suspense>
  )
}
