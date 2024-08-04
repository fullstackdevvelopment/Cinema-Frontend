import { createReducer } from '@reduxjs/toolkit';
import { resetPasswordFinished } from '../actions/resetPasswordFinished';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(resetPasswordFinished.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(resetPasswordFinished.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(resetPasswordFinished.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
