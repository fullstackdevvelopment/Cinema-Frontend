import { createReducer } from '@reduxjs/toolkit';
import { emailVerification } from '../actions/emailVerification';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(emailVerification.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(emailVerification.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(emailVerification.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
