// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import brandSlice from './BrandSlice';
import categoryReducer from './CategorySlice';
import commonSlice from './CommonSlice';
import productReducer from './ProductSlice';
import userSlice from './UserSlice';
import discountedProductsReducer from './discountedProductsSlice';
import categoriesReducer  from './categoriesSlice';
import productDetailsReducer from './productDetailsSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice,
    category: categoryReducer,
    product: productReducer,
    brand: brandSlice,
    user: userSlice,
    discountedProducts: discountedProductsReducer,
    categories: categoriesReducer,
    productDetails: productDetailsReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
