import { ACTIONS } from 'app/constants';

export interface Action {
  type: ACTIONS;
  payload?: any;
}

export interface TodoState {
  todos: Todo[];
}

export type Todo = { text: string; isDone: boolean; id: number };
