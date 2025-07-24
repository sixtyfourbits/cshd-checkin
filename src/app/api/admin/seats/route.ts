
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { isAdmin } from '@/lib/session';

const db = new Database('database.db');

export async function GET(req: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const seats = db.prepare(`
    SELECT
      s.id,
      s.is_occupied,
      u.name,
      u.grade,
      u.class_number,
      u.student_number
    FROM Seats s
    LEFT JOIN Users u ON s.user_id = u.id
  `).all();

  return NextResponse.json(seats);
}
