import { createReducer } from '@reduxjs/toolkit';
import { createReview } from '../actions/createReview';

const initialState = {
  review: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createReview.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createReview.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.review;
      state.error = null;
    })
    .addCase(createReview.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
