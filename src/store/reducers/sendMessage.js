import { createReducer } from '@reduxjs/toolkit';
import { sendMessage } from '../actions/sendMessage';

const initialState = {
  data: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(sendMessage.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(sendMessage.fulfilled, (state, action) => {
      state.status = 'ok';
      state.user = action.payload;
      state.error = null;
    })
    .addCase(sendMessage.rejected, (state, action) => {
      state.status = 'fail';
      state.admin = [];
      state.error = action.payload;
    });
});
