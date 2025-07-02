import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './products/productsSlice';
import { ordersReducer } from './orders/ordersSlice';
import { filterReducer } from './filter/filterSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    filter: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
