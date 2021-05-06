import { configureStore } from '@reduxjs/toolkit';
import globalsReducer from '../redux/reducers/globals';
import filtersReducer from '../redux/reducers/filters';
import coinsReducer from '../redux/reducers/coins';
import exchangeRatesReducer from '../redux/reducers/exchangeRates';

export const store = configureStore({
  reducer: {
    globals: globalsReducer,
    filters: filtersReducer,
    coins: coinsReducer,
    exchangeRates: exchangeRatesReducer,
  },
});
