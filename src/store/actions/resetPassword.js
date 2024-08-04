import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const resetPassword = createAsyncThunk('users/resetPassword', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.resetPassword(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
