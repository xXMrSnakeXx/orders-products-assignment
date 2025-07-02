import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { OrderWithProducts } from '../../types';
import { deleteOrder, fetchOrders } from './operations';

interface OrdersState {
  items: OrderWithProducts[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<OrderWithProducts[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<OrderWithProducts>) => {
          state.isLoading = false;
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      )
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
