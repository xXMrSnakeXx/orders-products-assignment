import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { OrderWithProducts } from '../../types';

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export const fetchOrders = createAsyncThunk<OrderWithProducts[]>(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<OrderWithProducts[]>(
        `${URL}/api/orders`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('Unexpected error');
    }
  }
);

export const deleteOrder = createAsyncThunk<OrderWithProducts, number>(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete<OrderWithProducts>(
        `${URL}/api/orders/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('Unexpected error');
    }
  }
);
