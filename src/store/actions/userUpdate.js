import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { userData } from './userData';

export const userUpdate = createAsyncThunk('users/userUpdate', async (payload, thunkAPI) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await Api.userUpdate(payload);
    thunkAPI.dispatch(userData(token));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
