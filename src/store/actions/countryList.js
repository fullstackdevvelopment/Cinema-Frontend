import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const countryList = createAsyncThunk('movie/countryList', async (thunkAPI) => {
  try {
    const { data } = await Api.countryList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
