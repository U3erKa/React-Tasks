import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './slices/todoReducer';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;

export type TodoDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
