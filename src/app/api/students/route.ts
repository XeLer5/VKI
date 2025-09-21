import { getStudentsDb } from '@/db/studentDb';

export async function GET() {
  try {
    const students = await getStudentsDb();
    return new Response(JSON.stringify(students), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка при получении студентов' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}