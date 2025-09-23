'use client';

import useStudents from '@/hooks/useStudents';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <ul className={styles.Students}>
      {students.map(student => (
        <li key={student.id}>
          {student.first_name} {student.last_name} — {student.email}
        </li>
      ))}
    </ul>
  );
};

export default Students;