import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

/**
 * Redux Store Configuration:
 * Configures and exports the central Redux store.
 * The 'cart' slice is mounted under the state key 'cart'.
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
