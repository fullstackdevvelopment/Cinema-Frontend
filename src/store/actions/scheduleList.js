import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const scheduleList = createAsyncThunk('schedule/scheduleList', async (_, thunkAPI) => {
  try {
    const { data } = await Api.scheduleList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
