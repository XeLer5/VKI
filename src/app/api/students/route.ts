import { addStudentDb, getStudentsDb } from "@/db/studentDb"


export async function GET(): Promise<Response> {
  const students = await getStudentsDb()

  return new Response(JSON.stringify(students), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req: Request): Promise<Response> {
  try {
    const data = await req.json()

    // пример: { name: 'Иван Иванов', groupId: 1 }
    const newStudent = await addStudentDb(data)

    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Ошибка при добавлении студента:', error)
    return new Response(JSON.stringify({ message: 'Ошибка при добавлении студента' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
