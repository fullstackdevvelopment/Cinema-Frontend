import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const uploadTicket = createAsyncThunk('users/uploadTicket', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.uploadTicket(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
