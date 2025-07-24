
'use client';

import { useEffect, useState } from 'react';

interface Log {
  id: number;
  seat_id: number;
  name: string;
  grade: number;
  class_number: number;
  student_number: number;
  check_in_time: string;
  check_out_time: string | null;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/admin/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        setFilteredLogs(data);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const results = logs.filter(log =>
      log.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(results);
  }, [searchTerm, logs]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">출입 기록</h1>
      <input
        type="text"
        placeholder="이름으로 검색..."
        className="w-full p-2 mb-4 border rounded-md"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">이름</th>
              <th className="p-4 text-left">정보</th>
              <th className="p-4 text-left">좌석</th>
              <th className="p-4 text-left">입실 시간</th>
              <th className="p-4 text-left">퇴실 시간</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{log.name}</td>
                <td className="p-4">{`${log.grade}학년 ${log.class_number}반 ${log.student_number}번`}</td>
                <td className="p-4">{log.seat_id}</td>
                <td className="p-4">{new Date(log.check_in_time).toLocaleString()}</td>
                <td className="p-4">{log.check_out_time ? new Date(log.check_out_time).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
