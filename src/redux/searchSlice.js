import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearch = createAsyncThunk('cocktails/searchCocktails', async (name, {getState}) => {
  const res = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}search.php?s=${name}`
  );
  return res.data.drinks;
});


export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    drinks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchSearch.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSearch.fulfilled]: (state, action) => {
      state.drinks = action.payload;
      state.status = 'succeeded';
    },
    [fetchSearch.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})


export default searchSlice.reducer;