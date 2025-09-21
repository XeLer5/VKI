'use client';

import React, { useEffect, useState } from 'react';
import type StudentInterface from '@/types/StudentInterface';

const Students: React.FC = () => {
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/students');
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data: StudentInterface[] = await res.json();
        setStudents(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Неизвестная ошибка при загрузке студентов');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return React.createElement('div', null, 'Загрузка...');
  if (error) return React.createElement('div', { style: { color: 'red' } }, error);

  return React.createElement(
    'ul',
    null,
    students.map(student =>
      React.createElement(
        'li',
        { key: student.id },
        `${student.first_name} ${student.last_name} — ${student.email}`
      )
    )
  );
};

export default Students;