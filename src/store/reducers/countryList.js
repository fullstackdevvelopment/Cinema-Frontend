import { createReducer } from '@reduxjs/toolkit';
import { countryList } from '../actions/countryList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(countryList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(countryList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.error = null;
    })
    .addCase(countryList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
