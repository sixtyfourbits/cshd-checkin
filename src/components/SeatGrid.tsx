
'use client';

import { useState } from 'react';
import SeatModal from './SeatModal';

export interface Seat {
  id: number;
  is_occupied: boolean;
  name: string | null;
  grade: number | null;
  class_number: number | null;
  student_number: number | null;
}

interface SeatGridProps {
  seats: Seat[];
}

export default function SeatGrid({ seats }: SeatGridProps) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  return (
    <>
      <div className="grid grid-cols-10 gap-4">
        {seats.map((seat) => {
          const occupiedClasses = 'bg-green-500 text-white cursor-pointer';
          const emptyClasses = 'bg-gray-300 text-gray-600 cursor-not-allowed';
          const buttonClasses = `p-4 border rounded-lg text-center font-bold ${seat.is_occupied ? occupiedClasses : emptyClasses}`;

          return (
            <button
              key={seat.id}
              onClick={() => seat.is_occupied && setSelectedSeat(seat)}
              className={buttonClasses}
            >
              {seat.id}
            </button>
          );
        })}
      </div>
      {selectedSeat && <SeatModal seat={selectedSeat} onClose={() => setSelectedSeat(null)} />}
    </>
  );
}
