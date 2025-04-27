import BaseApi from '@shared/api/BaseApi';
import { get } from 'http';

export async function getUserData(userId: string) {
    const response = await BaseApi.get(`http://localhost:5173/api/users/${userId}`);
    if (!response.ok) throw new Error('Не удалось получить пользователя');
    return await response.json();
  }
  