import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const sendMessage = createAsyncThunk('email/sendMessage', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.sendMessage(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
