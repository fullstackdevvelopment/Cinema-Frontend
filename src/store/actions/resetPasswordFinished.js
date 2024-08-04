import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const resetPasswordFinished = createAsyncThunk('users/resetPasswordFinished', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.resetPasswordFinished(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
