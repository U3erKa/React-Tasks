import { createSlice } from '@reduxjs/toolkit';
import { SLICE } from 'app/constants';
import { TodoState } from 'components/Todo/types';
import { addTodoReducer, deleteTodoReducer, getTaskByIdReducer, getTodosReducer, markDoneReducer } from './todoReducer';

export const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem(SLICE.TODOS) as string) ?? [],
  isLoading: false,
  error: null,
};

// function updateLocalStorage({ todos }: TodoState) {
//   localStorage.setItem(SLICE.TODOS, JSON.stringify(todos));
// }

const todoReducer = createSlice({
  name: SLICE.TODOS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addTodoReducer(builder);
    getTodosReducer(builder);
    markDoneReducer(builder);
    deleteTodoReducer(builder);
    getTaskByIdReducer(builder);
  },
});

export default todoReducer.reducer;
