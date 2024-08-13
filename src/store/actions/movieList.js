import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const movieList = createAsyncThunk('movie/movieList', async (thunkAPI) => {
  try {
    const { data } = await Api.movieList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
