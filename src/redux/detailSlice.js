import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDetail = createAsyncThunk('cocktails/getDetail', async (id, {getState}) => {
  const res = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}lookup.php?i=${id}`
  )
  return res.data.drinks;
});

export const detailSlice = createSlice({
  name: 'details',
  initialState: {
    features: [],
    ingredients: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDetail.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDetail.fulfilled]: (state, action) => {
      state.features = action.payload[0];

      // ingredients dizisini sıfırla (üst üste eklemeyi engeller)
      state.ingredients = [];

      //ingredients
      for (var key in state.features) {
        if (key.startsWith("strIngredient")) {
          var num = key.match(/\d+/g)[0];
          var mesKey = "strMeasure" + key.match(/\d+/g)[0]; // içerik numarası
          if (state.features[key] !== null) {
            state.ingredients.push({ id: num, ing: state.features[key], mes: state.features[mesKey] });
          }
        }
      }

      state.status = 'succeeded';
    },
    [fetchDetail.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

export default detailSlice.reducer;