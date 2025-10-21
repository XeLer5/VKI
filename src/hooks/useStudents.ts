import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteStudentApi, getStudentsApi, addStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  createStudentMutate: (student: Omit<StudentInterface, 'id'>) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  /**
   * Запрос списка студентов
   */
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true, // чтобы загружалось при монтировании
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),

    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });

      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      if (!previousStudents) return { previousStudents: [] };

      const updatedStudents = previousStudents.map((s) =>
        s.id === studentId ? { ...s, isDeleted: true } : s
      );

      queryClient.setQueryData(['students'], updatedStudents);
      return { previousStudents };
    },

    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate err', err);
      queryClient.setQueryData(['students'], context?.previousStudents ?? []);
    },

    onSuccess: (studentId, variables, context) => {
      const prev = context?.previousStudents ?? [];
      queryClient.setQueryData(
        ['students'],
        prev.filter((s) => s.id !== studentId)
      );
    },
  });


  const createStudentMutate = useMutation({
    mutationFn: async (student: Omit<StudentInterface, 'id'>) => addStudentApi(student),

    onMutate: async (newStudent: Omit<StudentInterface, 'id'>) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });

      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
      const optimisticStudent = {
        ...newStudent,
        id: Date.now(),
        isPending: true,
      } as StudentInterface;

      queryClient.setQueryData(['students'], [...previousStudents, optimisticStudent]);

      return { previousStudents };
    },

    onError: (err, newStudent, context) => {
      console.log('>>> createStudentMutate err', err);
      queryClient.setQueryData(['students'], context?.previousStudents ?? []);
    },

    onSuccess: (createdStudent, newStudent, context) => {
      if (!createdStudent) return;
      const previous = context?.previousStudents ?? [];
      queryClient.setQueryData(['students'], [...previous, createdStudent]);
    },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    createStudentMutate: createStudentMutate.mutate,
  };
};

export default useStudents;
