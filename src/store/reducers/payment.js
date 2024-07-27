import { createReducer } from '@reduxjs/toolkit';
import { createPaymentIntent, updatePaymentStatus, handleWebhook } from '../actions/payment';

const initialState = {
  paymentIntent: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createPaymentIntent.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createPaymentIntent.fulfilled, (state, action) => {
      state.status = 'ok';
      state.paymentIntent = action.payload;
      state.error = null;
    })
    .addCase(createPaymentIntent.rejected, (state, action) => {
      state.status = 'fail';
      state.paymentIntent = null;
      state.error = action.payload;
    })
    .addCase(updatePaymentStatus.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(updatePaymentStatus.fulfilled, (state, action) => {
      state.status = 'ok';
      state.paymentIntent = { ...state.paymentIntent, ...action.payload };
      state.error = null;
    })
    .addCase(updatePaymentStatus.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    })
    .addCase(handleWebhook.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(handleWebhook.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(handleWebhook.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
