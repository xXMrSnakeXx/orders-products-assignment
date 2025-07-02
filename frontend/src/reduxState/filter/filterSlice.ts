import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  type: string;
}

const initialState: FilterState = {
  type: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
