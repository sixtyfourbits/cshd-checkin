
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('database.db');

export async function POST(req: NextRequest) {
  const { grade, class_number, student_number, name, seat_id } = await req.json();

  if (!grade || !class_number || !student_number || !name || !seat_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const seat = db.prepare('SELECT * FROM Seats WHERE id = ?').get(seat_id);

  if (seat.is_occupied) {
    return NextResponse.json({ error: 'Seat is already occupied' }, { status: 409 });
  }

  const user = db.prepare('INSERT INTO Users (grade, class_number, student_number, name) VALUES (?, ?, ?, ?)').run(grade, class_number, student_number, name);
  const user_id = user.lastInsertRowid;

  db.prepare('UPDATE Seats SET is_occupied = 1, user_id = ? WHERE id = ?').run(user_id, seat_id);

  db.prepare('INSERT INTO AttendanceLog (seat_id, user_id, check_in_time) VALUES (?, ?, ?)').run(seat_id, user_id, new Date().toISOString());

  return NextResponse.json({ message: 'Check-in successful' });
}
