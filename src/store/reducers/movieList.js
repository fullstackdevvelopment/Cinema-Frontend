import { createReducer } from '@reduxjs/toolkit';
import { movieList } from '../actions/movieList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(movieList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(movieList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.error = null;
    })
    .addCase(movieList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = [];
      state.error = action.payload;
    });
});
