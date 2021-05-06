import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 'all',
};

export const globalsDataSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      state.activeFilter = state.activeFilter === 'all' ? 'favorited' : 'all';
    },
  },
});

export const { toggleFilter } = globalsDataSlice.actions;

export const selectActiveFilter = (state) => state.filters.activeFilter;

export default globalsDataSlice.reducer;
