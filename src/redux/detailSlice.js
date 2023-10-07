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
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDetail.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDetail.fulfilled]: (state, action) => {
      state.features = action.payload;
      state.status = 'succeeded';
    },
    [fetchDetail.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

export default detailSlice.reducer;