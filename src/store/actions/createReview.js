import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { reviewList } from './reviewList';

export const createReview = createAsyncThunk('review/createReview', async (payload, thunkAPI) => {
  try {
    const { userId, movieId, comment } = payload;
    const { data } = await Api.createReview({ userId, movieId, comment });
    thunkAPI.dispatch(reviewList(movieId));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
