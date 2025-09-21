import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise<StudentInterface[]>((resolve, reject) => {
    const sql = 'SELECT * FROM student'; // замените на реальное название таблицы
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows as StudentInterface[]);
      db.close();
    });
  });

  return students;
};