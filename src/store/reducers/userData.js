import { createReducer } from '@reduxjs/toolkit';
import { userData } from '../actions/userData';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(userData.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(userData.fulfilled, (state, action) => {
      state.status = 'ok';
      state.data = action.payload;
      state.error = null;
    })
    .addCase(userData.rejected, (state, action) => {
      state.status = 'fail';
      state.data = [];
      state.error = action.payload;
    });
});
