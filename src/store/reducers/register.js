import { createReducer } from '@reduxjs/toolkit';
import { register } from '../actions/register';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.status = 'ok';
      state.user = action.payload;
      state.error = null;
    })
    .addCase(register.rejected, (state, action) => {
      state.status = 'fail';
      state.admin = [];
      state.error = action.payload;
    });
});
