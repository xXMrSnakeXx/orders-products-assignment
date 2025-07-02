import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import type { Product } from '../../types';

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(`${URL}/api/products`);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }

      return rejectWithValue('Unexpected error');
    }
  }
);
