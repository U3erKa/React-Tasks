import { ACTIONS } from 'app/constants';
import { todoSchema } from 'app/schemas/todo';
import * as yup from 'yup';

export interface Action {
  type: ACTIONS;
  payload?: any;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: any;
}

export type TodoInputEntry = yup.InferType<typeof todoSchema>;

export type Todo = { text: string; isDone: boolean; id: number };
