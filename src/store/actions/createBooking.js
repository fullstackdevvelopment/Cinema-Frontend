import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const createBooking = createAsyncThunk('booking/createBooking', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.createBooking(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
