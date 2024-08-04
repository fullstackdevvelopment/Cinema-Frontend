import { createReducer } from '@reduxjs/toolkit';
import { resetPassword } from '../actions/resetPassword';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(resetPassword.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
