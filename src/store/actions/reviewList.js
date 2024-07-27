import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const reviewList = createAsyncThunk('admins/reviewList', async (movieId, thunkAPI) => {
  try {
    const { data } = await Api.reviewList(movieId);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
