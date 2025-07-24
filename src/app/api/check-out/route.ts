
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('database.db');

export async function POST(req: NextRequest) {
  const { seat_id } = await req.json();

  if (!seat_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const seat = db.prepare('SELECT * FROM Seats WHERE id = ?').get(seat_id);

  if (!seat.is_occupied) {
    return NextResponse.json({ error: 'Seat is not occupied' }, { status: 409 });
  }

  db.prepare('UPDATE Seats SET is_occupied = 0, user_id = NULL WHERE id = ?').run(seat_id);

  db.prepare('UPDATE AttendanceLog SET check_out_time = ? WHERE seat_id = ? AND check_out_time IS NULL').run(new Date().toISOString(), seat_id);

  return NextResponse.json({ message: 'Check-out successful' });
}
