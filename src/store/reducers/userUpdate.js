import { createReducer } from '@reduxjs/toolkit';
import { userUpdate } from '../actions/userUpdate';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(userUpdate.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(userUpdate.fulfilled, (state, action) => {
      state.status = 'ok';
      state.data = action.payload;
      state.error = null;
    })
    .addCase(userUpdate.rejected, (state, action) => {
      state.status = 'fail';
      state.data = [];
      state.error = action.payload;
    });
});
