import AppDataSource from './AppDataSource';
import { Student } from './entity/Student.entity';
import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';

async function getRepo() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(Student);
}

/**
 * Получение студентов
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const repo = await getRepo();
  return await repo.find();
};

/**
 * Удаление студента
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const repo = await getRepo();
  await repo.delete(studentId);
  return studentId;
};

/**
 * Добавление студента
 */
export const addStudentDb = async (
  studentFields: Omit<StudentInterface, 'id'>
): Promise<StudentInterface> => {
  const repo = await getRepo();
  const newStudent = repo.create(studentFields);
  return await repo.save(newStudent);
};

/**
 * Добавление случайных студентов
 */
export const addRandomStudentsDb = async (
  amount: number = 10
): Promise<StudentInterface[]> => {
  const repo = await getRepo();
  const students: StudentInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    const newStudent = repo.create({
      ...fio,
      contacts: 'contact',
      groupId: 1,
    });
    students.push(await repo.save(newStudent));
  }

  return students;
};