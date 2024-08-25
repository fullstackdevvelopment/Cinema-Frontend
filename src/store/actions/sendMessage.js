import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const sendMessage = createAsyncThunk('email/sendMessage', async ({ data }, thunkAPI) => {
  try {
    const { response } = await Api.sendMessage(data);
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
