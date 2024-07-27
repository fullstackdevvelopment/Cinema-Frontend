import { createReducer } from '@reduxjs/toolkit';
import { reviewList } from '../actions/reviewList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(reviewList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(reviewList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.error = null;
    })
    .addCase(reviewList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
