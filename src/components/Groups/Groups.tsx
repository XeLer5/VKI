'use client';

import { useEffect, useState } from 'react';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/groups');
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data: GroupInterface[] = await res.json();
        setGroups(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Неизвестная ошибка при загрузке групп');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className={styles.Groups}>
      {groups.map(group => (
        <h2 key={group.id}>{group.name}</h2>
      ))}
    </div>
  );
};

export default Groups;