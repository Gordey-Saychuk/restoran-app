// src/store/productDetailsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Extra {
  [key: string]: [string, number];
}

interface ProductDetails {
  id: number;
  restaurant_name: string;
  category_name: string;
  name: string;
  photo: string;
  description: string;
  price: number;
  extra: Extra;
}

interface ProductDetailsState {
  details: ProductDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductDetailsState = {
  details: null,
  isLoading: false,
  error: null,
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetchProductDetails',
  async (dishId: number) => {
    const response = await axios.get(`http://94.124.78.52:8017/dish_details/?dish_id=${dishId}`);
    return response.data;
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.details = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export default productDetailsSlice.reducer;
