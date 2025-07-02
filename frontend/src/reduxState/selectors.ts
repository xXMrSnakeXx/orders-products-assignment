import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Product } from '../types';

export const selectProducts = (state: RootState) => state.products.items;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrdersIsLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export const selectFilter = (state: RootState) => state.filter.type;

export const filteredProducts = createSelector(
  [selectProducts, selectFilter],
  (products: Product[], filter: string): Product[] => {
    if (!filter) return products;
    return products.filter(
      (product) => product.type?.toLowerCase() === filter.toLowerCase()
    );
  }
);
