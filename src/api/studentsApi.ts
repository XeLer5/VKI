import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    return await response.json() as StudentInterface[];
  } catch (err) {
    console.error('>>> getStudentsApi', err);
    return [];
  }
};