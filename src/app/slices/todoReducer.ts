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
  fulfilledReducer: (state: TodoState, { payload }: { payload: any }) => {
    state.isLoading = false;
    state.todos = payload;
    state.error = null;
  },
});

export const addTodoReducer = createExtraReducers({
  thunk: addTodo,
  fulfilledReducer: (state: TodoState, { payload }: { payload: any }) => {
    state.isLoading = false;
    state.todos.push({ ...payload });
    state.error = null;
  },
});

export const markDoneReducer = createExtraReducers({
  thunk: markDone,
  fulfilledReducer: (state: TodoState, { payload }: { payload: any }) => {
    state.isLoading = false;
    // state.todos = { ...payload };
    state.error = null;
  },
});

export const deleteTodoReducer = createExtraReducers({
  thunk: deleteTodo,
  fulfilledReducer: (state: TodoState, { payload }: { payload: string }) => {
    state.isLoading = false;
    state.todos = state.todos.filter((todo) => todo.id !== +payload);
    state.error = null;
  },
});

export const getTaskByIdReducer = createExtraReducers({
  thunk: getTaskById,
  fulfilledReducer: (state: TodoState, { payload }: { payload: any }) => {
    state.isLoading = false;
    // state.todos = { ...payload };
    state.error = null;
  },
});

export { addTodo, getTodos, markDone, deleteTodo, getTaskById };
