import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const register = createAsyncThunk('users/register', async ({ formData }, thunkAPI) => {
  try {
    const { data } = await Api.register(formData);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
