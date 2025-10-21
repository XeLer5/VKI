import { addStudentDb, getStudentsDb } from '@/db/studentDb';
import AppDataSource from '@/db/AppDataSource';

async function ensureDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(): Promise<Response> {
  try {
    await ensureDB();
    const students = await getStudentsDb();

    return new Response(JSON.stringify(students), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Ошибка при получении студентов:', error);
    return new Response(
      JSON.stringify({
        message: 'Ошибка при получении студентов',
        error: error?.message ?? error,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    await ensureDB();
    const data = await req.json();

    const newStudent = await addStudentDb(data);

    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Ошибка при добавлении студента:', error);
    return new Response(JSON.stringify({ message: 'Ошибка при добавлении студента' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}