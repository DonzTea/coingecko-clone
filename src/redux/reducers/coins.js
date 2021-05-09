import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCoins } from '../thunks/fetchCoins';

const initialState = {
  data: [],
  sortBy: {
    number: {
      status: true,
      order: 'asc', // 'asc' || 'desc'
    },
    name: {
      status: false,
      order: 'asc',
    },
    price: {
      status: false,
      order: 'asc',
    },
    percentage1h: {
      status: false,
      order: 'asc',
    },
    percentage24h: {
      status: false,
      order: 'asc',
    },
    percentage7d: {
      status: false,
      order: 'asc',
    },
    volume: {
      status: false,
      order: 'asc',
    },
    marketCap: {
      status: false,
      order: 'asc',
    },
  },
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
    sortCoinBy: (state, action) => {
      const sortKey = action.payload;

      const sortKeys = Object.keys(state.sortBy);
      if (!sortKeys.includes(sortKey))
        return console.error(`sort by ${sortKey} is not available.`);

      for (const key of sortKeys) {
        const sortTarget = state.sortBy[key];
        if (key === sortKey) {
          sortTarget.status = true;

          const newOrder = sortTarget.order === 'asc' ? 'desc' : 'asc';
          sortTarget.order = newOrder;

          state.data = [...state.data].sort((a, b) => {
            if (sortKey === 'name') {
              const string1 = a[sortKey].toLowerCase();
              const string2 = b[sortKey].toLowerCase();
              if (newOrder === 'desc') {
                if (string1 > string2) {
                  return -1;
                }
                if (string1 < string2) {
                  return 1;
                }
              } else {
                if (string1 < string2) {
                  return -1;
                }
                if (string1 > string2) {
                  return 1;
                }
              }
              return 0;
            } else {
              if (newOrder === 'desc') {
                return b[sortKey] - a[sortKey];
              } else {
                return a[sortKey] - b[sortKey];
              }
            }
          });
        } else {
          sortTarget.status = false;
          sortTarget.order = 'asc';
        }
      }
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

export const { toggleFavorite, sortCoinBy } = coinsDataSlice.actions;

export const selectCoins = (state) => state.coins.data;
export const selectActiveSort = (state) => {
  const sortKeys = Object.keys(state.coins.sortBy);
  let result;
  for (const key of sortKeys) {
    if (state.coins.sortBy[key].status) {
      result = {
        key,
        order: state.coins.sortBy[key].order,
      };
      break;
    }
  }
  return result;
};

export default coinsDataSlice.reducer;
