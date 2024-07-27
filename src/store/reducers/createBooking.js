import { createReducer } from '@reduxjs/toolkit';
import { createBooking } from '../actions/createBooking';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createBooking.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createBooking.fulfilled, (state, action) => {
      state.status = 'ok';
      state.data = action.payload;
    })
    .addCase(createBooking.rejected, (state, action) => {
      state.status = 'fail';
      state.data = [];
      state.error = action.payload;
    });
});
