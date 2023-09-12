import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCocktails = createAsyncThunk('cocktails/getCocktails', async () => {
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}?c=Cocktail`)
  return res.data.drinks.slice(0,40)
})

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    drinks: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.drinks = action.payload;
      state.isLoading = false;
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
  }
});

export default cocktailsSlice.reducer;