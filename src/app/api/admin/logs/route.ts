
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { isAdmin } from '@/lib/session';

const db = new Database('database.db');

export async function GET(req: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const logs = db.prepare(`
    SELECT
      al.id,
      al.seat_id,
      u.name,
      u.grade,
      u.class_number,
      u.student_number,
      al.check_in_time,
      al.check_out_time
    FROM AttendanceLog al
    JOIN Users u ON al.user_id = u.id
    ORDER BY al.check_in_time DESC
  `).all();

  return NextResponse.json(logs);
}
