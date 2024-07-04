import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const userData = createAsyncThunk('users/userData', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.userData(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
