import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const movieList = createAsyncThunk('movie/movieList', async ({ page, limit }, thunkAPI) => {
  try {
    const { data } = await Api.movieList(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
