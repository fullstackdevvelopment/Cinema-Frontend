import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const filteredMovieList = createAsyncThunk(
  'movie/filteredMovieList',
  async ({
    page, limit, title = '', categoryIds = [], countries = [], years = [],
  }, thunkAPI) => {
    try {
      const { data } = await Api.filteredMovieList({
        page, limit, title, categoryIds, countries, years,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response ? e.response.data : e.message);
    }
  },
);
