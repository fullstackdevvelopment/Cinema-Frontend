import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const singleMovie = createAsyncThunk('movie/singleMovie', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.singleMovie(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
