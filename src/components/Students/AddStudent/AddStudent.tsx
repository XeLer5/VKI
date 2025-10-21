'use client';
import StudentInterface from '@/types/StudentInterface';
import { useForm } from 'react-hook-form';

interface AddStudentProps {
  onSubmit: (data: Omit<StudentInterface, 'id'>) => void;
}

export default function AddStudent({ onSubmit }: AddStudentProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<StudentInterface, 'id'>>();

  const handleFormSubmit = (data: Omit<StudentInterface, 'id'>) => {
    const payload = {
      ...data,
      groupId: Number(data.group),
    };
    delete payload.group;

    onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-3 max-w-md">
      <input
        {...register('firstName', { required: 'Введите имя' })}
        placeholder="Имя"
        className="border p-2 rounded"
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

      <input
        {...register('lastName', { required: 'Введите фамилию' })}
        placeholder="Фамилия"
        className="border p-2 rounded"
      />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

      <input
        {...register('middleName', { required: 'Введите отчество' })}
        placeholder="Отчество"
        className="border p-2 rounded"
      />
      {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName.message}</p>}

      <input
        {...register('phone', { required: 'Введите телефон' })}
        placeholder="Телефон"
        className="border p-2 rounded"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <input
        {...register('group', { required: 'Введите группу' })}
        placeholder="Группа"
        className="border p-2 rounded"
      />
      {errors.group && <p className="text-red-500 text-sm">{errors.group.message}</p>}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Добавить студента
      </button>
    </form>
  );
}
