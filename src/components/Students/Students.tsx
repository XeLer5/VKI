'use client';

import React from 'react';
import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';


const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, createStudentMutate } = useStudents();

  const onDeleteHandler = (id: number): void => {
    deleteStudentMutate(id);
  };

  const onCreateHandler = (data: Omit<StudentInterface, 'id'>): void => {
    createStudentMutate(data);
  };

  return (
    <div className={styles.Students}>
      <h2>Добавить студента</h2>
      <AddStudent onSubmit={onCreateHandler} />

      <h2>Список студентов</h2>
      {students.length > 0 ? (
        students.map((student: StudentInterface) => (
          <Student
            key={student.id}
            student={student}
            onDelete={onDeleteHandler}
          />
        ))
      ) : (
        <p>Студентов пока нет</p>
      )}
    </div>
  );
};

export default Students;
