import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoState } from 'components/Todo/types';

export const decorateAsyncThunk = ({ key, thunk }: { key: string; thunk: Function }) => {
  const asyncThunk = createAsyncThunk(key, async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await thunk(payload, thunkAPI);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  });
  return asyncThunk;
};

export const createExtraReducers =
  ({ thunk, pendingReducer, fulfilledReducer, rejectedReducer }: any) =>
  (builder: ActionReducerMapBuilder<TodoState>) => {
    builder.addCase(
      thunk.pending,
      pendingReducer
        ? pendingReducer
        : (state: TodoState) => {
            state.isLoading = true;
          }
    );
    builder.addCase(
      thunk.fulfilled,
      fulfilledReducer
        ? fulfilledReducer
        : (state: TodoState, { payload }: { payload: string }) => {
            state.isLoading = false;
            state.error = null;
          }
    );
    builder.addCase(
      thunk.rejected,
      rejectedReducer
        ? rejectedReducer
        : (state: TodoState, { payload }: { payload: any }) => {
            state.isLoading = false;
            state.error = payload;
          }
    );
  };
