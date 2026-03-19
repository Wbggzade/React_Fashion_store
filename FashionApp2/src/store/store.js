import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const STORAGE_KEY = 'bagItems';

const loadCartState = () => {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);

    if (!savedItems) {
      return undefined;
    }

    return {
      cart: {
        items: JSON.parse(savedItems),
      },
    };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCartState(),
});

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart.items));
});

export default store;