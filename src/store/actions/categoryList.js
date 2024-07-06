import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const categoryList = createAsyncThunk('category/categoryList', async (thunkAPI) => {
  try {
    const { data } = await Api.categoryList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
