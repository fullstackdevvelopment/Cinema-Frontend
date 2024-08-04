import { createReducer } from '@reduxjs/toolkit';
import { uploadTicket } from '../actions/uploadTicket';

const initialState = {
  file: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(uploadTicket.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(uploadTicket.fulfilled, (state, action) => {
      state.status = 'ok';
      state.file = action.payload.pdfUrl;
      state.error = null;
    })
    .addCase(uploadTicket.rejected, (state, action) => {
      state.status = 'fail';
      state.file = null;
      state.error = action.payload;
    });
});
