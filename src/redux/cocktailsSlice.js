import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const item_limit = 20

export const fetchCocktails = createAsyncThunk('cocktails/getCocktails', async (page, {getState}) => {
  const state = getState();
  const pageSize = state.cocktails.page;
  const start_item = pageSize*item_limit;
  const end_item = (pageSize+1)*item_limit;
  const res = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}?c=Cocktail`
  );
  return res.data.drinks.slice(start_item, end_item);
});


export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    drinks: [],
    isLoading: false,
    page: 0,
    error: null,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCocktails.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.drinks = [...state.drinks, ...action.payload];
      state.isLoading = false;
      state.page += 1;

      if(action.payload.length < 12) {
        state.hasNextPage = false;
      }
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
  }
})


export default cocktailsSlice.reducer;