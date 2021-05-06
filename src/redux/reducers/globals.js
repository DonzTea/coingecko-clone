import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchGlobals from '../thunks/fetchGlobals';

const initialState = {
  coins: '-',
  exchanges: '-',
  marketCap: '-',
  marketCapPercentage: '-',
  vol24h: '-',
  btcDominance: '-',
  ethDominance: '-',
  ethGas: '-',
};

export const fetchGlobalsThunk = createAsyncThunk(
  'globals/fetchGlobals',
  async () => {
    const result = await fetchGlobals();
    return result;
  },
);

export const globalsDataSlice = createSlice({
  name: 'globals',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalsThunk.pending, (state) => {
        // doing something on pending
      })
      .addCase(fetchGlobalsThunk.fulfilled, (state, action) => {
        const stateNames = Object.keys(action.payload);
        for (const stateName of stateNames) {
          state[stateName] = action.payload[stateName];
        }
      });
  },
});

export const selectCoins = (state) => state.globals.coins;
export const selectExchanges = (state) => state.globals.exchanges;
export const selectMarketCap = (state) => state.globals.marketCap;
export const selectMarketCapPercentage = (state) =>
  state.globals.marketCapPercentage;
export const selectVol24h = (state) => state.globals.vol24h;
export const selectBtcDominance = (state) => state.globals.btcDominance;
export const selectEthDominance = (state) => state.globals.ethDominance;
export const selectEthGas = (state) => state.globals.ethGas;

export default globalsDataSlice.reducer;
