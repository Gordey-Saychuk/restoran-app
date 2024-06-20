import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Dish {
  id: number;
  restaurant_id: number;
  category_id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  extra: object;
}

interface DishesState {
  dishes: Dish[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: [],
  isLoading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async (restaurantId: number) => {
    try {
      const response = await axios.get(`http://94.124.78.52:8017/dishes/?restaurant_id=1&category_id=${restaurantId}`);
      console.log('Response from server:', response);
      return response.data;
    } catch (error) {
      console.error('ошибка:', error);
      throw error; 
    }
  }
);



const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dishes';
      });
  },
});

export default dishesSlice.reducer;
