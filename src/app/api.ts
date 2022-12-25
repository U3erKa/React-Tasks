import axios from 'axios';
import { BASE_URL } from './constants';
import { Todo } from 'components/Todo/types';

export async function createTask(text: string) {
  return await axios.post<{ data: Todo }>(`${BASE_URL}`, { text });
}

export async function deleteTask(id: number) {
  return await axios.delete<{ data: number }>(`${BASE_URL}/${id}`);
}

export async function getTaskById(id: number) {
  return await axios.get<{ data: Todo | null}>(`${BASE_URL}/${id}`);
}

export async function getTasks() {
  return await axios.get<{ data: Todo[] }>(`${BASE_URL}`);
}

export async function updateTaskById(id: number, { text, isDone }: { text: string; isDone: boolean }) {
  return await axios.put<{ data: Todo }>(`${BASE_URL}/${id}`, { text, isDone });
}
