import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCartItem } from '../types/common';

const loadCartFromLocalStorage = (): ProductCartItem[] => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.warn("Couldn't load cart from local storage:", e);
    return [];
  }
};


const saveCartToLocalStorage = (cart: ProductCartItem[]) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.warn("Couldn't save cart to local storage:", e);
  }
};


interface CartState {
  items: ProductCartItem[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCartItem>) => {

      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice += action.payload.totalPrice;
      } else {
        state.items.push(action.payload);
      }

      // Сохраняем изменения в localStorage
      saveCartToLocalStorage(state.items);
    },
    // Другие редьюсеры...
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;