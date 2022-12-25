import { createExtraReducers, decorateAsyncThunk } from '../utils';
import { SLICE } from 'app/constants';
import { TodoState } from 'components/Todo/types';
import * as API from 'app/api';

const getTodos = decorateAsyncThunk({ key: `${SLICE.TODOS}/getTodos`, thunk: () => API.getTasks() });
const addTodo = decorateAsyncThunk({ key: `${SLICE.TODOS}/addTodo`, thunk: (data: string) => API.createTask(data) });
const markDone = decorateAsyncThunk({
  key: `${SLICE.TODOS}/updateTaskById`,
  thunk: (id: number, { text, isDone }: { text: string; isDone: boolean }) => API.updateTaskById(id, { text, isDone }),
});
const deleteTodo = decorateAsyncThunk({ key: `${SLICE.TODOS}/deleteTask`, thunk: (id: number) => API.deleteTask(id) });
const getTaskById = decorateAsyncThunk({
  key: `${SLICE.TODOS}/getTaskById`,
  thunk: (id: number) => API.getTaskById(id),
});

export const getTodosReducer = createExtraReducers({
  thunk: getTodos,
  pendingReducer: (state: TodoState) => {
    state.isLoading = true;
  },
  fulfilledReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.todos = payload;
    state.error = null;
  },
  rejectedReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.error = payload;
  },
});

export const addTodoReducer = createExtraReducers({
  thunk: addTodo,
  pendingReducer: (state: TodoState) => {
    state.isLoading = true;
  },
  fulfilledReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.todos.push({ ...payload });
    state.error = null;
  },
  rejectedReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.error = payload;
  },
});

export const markDoneReducer = createExtraReducers({
  thunk: markDone,
  pendingReducer: (state: TodoState) => {
    state.isLoading = true;
  },
  fulfilledReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    // state.todos = { ...payload };
    state.error = null;
  },
  rejectedReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.error = payload;
  },
});

export const deleteTodoReducer = createExtraReducers({
  thunk: deleteTodo,
  pendingReducer: (state: TodoState) => {
    state.isLoading = true;
  },
  fulfilledReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    // state.todos = { ...payload };
    state.error = null;
  },
  rejectedReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.error = payload;
  },
});

export const getTaskByIdReducer = createExtraReducers({
  thunk: getTaskById,
  pendingReducer: (state: TodoState) => {
    state.isLoading = true;
  },
  fulfilledReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    // state.todos = { ...payload };
    state.error = null;
  },
  rejectedReducer: (state: TodoState, { payload }: { payload: any; }) => {
    state.isLoading = false;
    state.error = payload;
  },
});

export { addTodo, getTodos, markDone, deleteTodo, getTaskById };
