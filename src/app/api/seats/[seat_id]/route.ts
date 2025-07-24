
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('database.db');

export async function GET(req: NextRequest, { params }: { params: { seat_id: string } }) {
  const seat_id = params.seat_id;

  const seat = db.prepare('SELECT * FROM Seats WHERE id = ?').get(seat_id);

  if (!seat) {
    return NextResponse.json({ error: 'Seat not found' }, { status: 404 });
  }

  return NextResponse.json(seat);
}
