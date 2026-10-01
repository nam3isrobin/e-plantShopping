import { createSlice } from '@reduxjs/toolkit';

/**
 * CartSlice manages the Redux state for the shopping cart.
 * It tracks the list of added plant items, quantities, and provides actions
 * to add, remove, and update quantities of items.
 */
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of plant items: [{ name, image, cost, quantity }]
  },
  reducers: {
    /**
     * addItem: Adds a plant item to the cart.
     * If the item already exists in the cart, increments its quantity by 1.
     * Otherwise, adds the item to the cart with an initial quantity of 1.
     */
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      // Search for an existing item by unique plant name
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // Increment quantity if already present
        existingItem.quantity += 1;
      } else {
        // Append new item to the cart with default quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    /**
     * removeItem: Removes a plant completely from the cart by its name.
     * Supports passing either the name directly (string) or an item object with a name property.
     */
    removeItem: (state, action) => {
      const nameToRemove = typeof action.payload === 'object' && action.payload !== null
        ? action.payload.name
        : action.payload;

      // Filter out the plant matching the name to remove
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    /**
     * updateQuantity: Updates the quantity of a specific item in the cart.
     * If the updated quantity drops to 0 or less, the item is removed from the cart.
     */
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // Guard: remove item if quantity drops to 0 or negative
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export action creators for dispatching in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export default reducer for configuring the store
export default CartSlice.reducer;
