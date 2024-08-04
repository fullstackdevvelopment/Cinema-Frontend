import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ amount, currency }, thunkAPI) => {
    try {
      const { data } = await Api.createPaymentIntent(amount, currency);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const updatePaymentStatus = createAsyncThunk(
  'payment/updatePaymentStatus',
  async ({ stripePaymentId, status }, thunkAPI) => {
    try {
      const { data } = await Api.updatePaymentStatus(stripePaymentId, status);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const handleWebhook = createAsyncThunk(
  'payment/handleWebhook',
  async (body, thunkAPI) => {
    try {
      const { data } = await Api.handleWebhook(body);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
