
'use client';

import { Seat } from './SeatGrid'; // Seat interface is now defined in SeatGrid

interface SeatModalProps {
  seat: Seat;
  onClose: () => void;
}

export default function SeatModal({ seat, onClose }: SeatModalProps) {
  const handleForceCheckout = async () => {
    if (!confirm(`좌석 ${seat.id}번을 강제 퇴실 처리하시겠습니까?`)) {
      return;
    }

    const res = await fetch('/api/check-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seat_id: seat.id }),
    });

    if (res.ok) {
      alert('강제 퇴실 처리되었습니다.');
      onClose(); // Close modal and trigger data refresh in parent
    } else {
      const { error } = await res.json();
      alert(`오류: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">좌석 {seat.id} 정보</h2>
        <p><strong>이름:</strong> {seat.name}</p>
        <p><strong>학년:</strong> {seat.grade}</p>
        <p><strong>반:</strong> {seat.class_number}</p>
        <p><strong>번호:</strong> {seat.student_number}</p>
        
        <div className="mt-6 space-y-2">
          <button onClick={handleForceCheckout} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            강제 퇴실
          </button>
          <button onClick={onClose} className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
