import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExchangeRates } from '../thunks/fetchExchangeRates';

const initialState = {
  data: {},
};

export const fetchExchangeRatesThunk = createAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async () => {
    const result = await fetchExchangeRates();
    return result;
  },
);

export const exchangeRatesDataSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRatesThunk.pending, (state) => {
        // doing something on pending
      })
      .addCase(fetchExchangeRatesThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const selectExchangeRates = (state) => state.exchangeRates.data;

export default exchangeRatesDataSlice.reducer;
