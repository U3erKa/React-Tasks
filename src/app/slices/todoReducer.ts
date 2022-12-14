import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoState, Todo } from 'components/Todo/types';
import { ACTIONS } from 'app/constants';

const resetState = {
  todos: [],
};

export const initialState: TodoState = { todos: JSON.parse(localStorage.getItem('todos') as string) } || resetState;

const todoReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        state.todos.push({ text: action.payload, isDone: false, id: Date.now() });
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    markDone: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        isDone: todo.id === action.payload ? !todo.isDone : todo.isDone,
      }));
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    resetTodos: (state) => {
      localStorage.removeItem('todos');
      state.todos = [];
    },
  },
});

export const { addTodo, markDone, deleteTodo, resetTodos } = todoReducer.actions;

export default todoReducer.reducer;
