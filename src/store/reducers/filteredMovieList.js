import { createReducer } from '@reduxjs/toolkit';
import { filteredMovieList } from '../actions/filteredMovieList';

const initialState = {
  list: [],
  status: '',
  error: null,
  totalPages: 1,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(filteredMovieList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(filteredMovieList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    })
    .addCase(filteredMovieList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
