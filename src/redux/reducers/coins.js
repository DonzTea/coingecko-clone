import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCoins } from '../thunks/fetchCoins';

const initialState = {
  data: [],
};

export const fetchCoinsThunk = createAsyncThunk(
  'coins/fetchCoins',
  async () => {
    const result = await fetchCoins();
    return result;
  },
);

export const coinsDataSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const coinId = action.payload;
      const selectedCoin = state.data.find((coin) => coin.id === coinId);
      selectedCoin.isFavorite = !selectedCoin.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsThunk.pending, (state) => {
        // doing something on pending
      })
      .addCase(fetchCoinsThunk.fulfilled, (state, action) => {
        state.data = [...action.payload];
      });
  },
});

export const { toggleFavorite } = coinsDataSlice.actions;

export const selectCoins = (state) => state.coins.data;

export default coinsDataSlice.reducer;
