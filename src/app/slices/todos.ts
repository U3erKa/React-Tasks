import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE } from 'app/constants';
import { TodoState } from 'components/Todo/types';

export const initialState: TodoState = { todos: JSON.parse(localStorage.getItem(SLICE.TODOS) as string) ?? [] };

function updateLocalStorage({ todos }: TodoState) {
  localStorage.setItem(SLICE.TODOS, JSON.stringify(todos));
}

const todoReducer = createSlice({
  name: SLICE.TODOS,
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      if (action.payload.trim()) {
        state.todos.push({ text: action.payload, isDone: false, id: Date.now() });
        updateLocalStorage(state);
      }
    },
    markDone: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        isDone: todo.id === action.payload ? !todo.isDone : todo.isDone,
      }));
      updateLocalStorage(state);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      updateLocalStorage(state);
    },
    resetTodos: (state) => {
      localStorage.removeItem(SLICE.TODOS);
      state.todos = [];
    },
  },
});

export const { addTodo, markDone, deleteTodo, resetTodos } = todoReducer.actions;

export default todoReducer.reducer;
