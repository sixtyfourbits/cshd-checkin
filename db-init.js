
const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log });

function init() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Seats (
      id INTEGER PRIMARY KEY,
      is_occupied BOOLEAN NOT NULL DEFAULT 0,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade INTEGER NOT NULL,
      class_number INTEGER NOT NULL,
      student_number INTEGER NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS AttendanceLog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seat_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      check_in_time DATETIME NOT NULL,
      check_out_time DATETIME,
      FOREIGN KEY (seat_id) REFERENCES Seats(id),
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );
  `);

  // Add 50 seats to the Seats table if they don't exist
  const stmt = db.prepare('SELECT COUNT(*) as count FROM Seats');
  const { count } = stmt.get();
  if (count === 0) {
    const insert = db.prepare('INSERT INTO Seats (id) VALUES (?)');
    for (let i = 1; i <= 50; i++) {
      insert.run(i);
    }
  }
}

init();
