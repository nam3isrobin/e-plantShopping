import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

/**
 * CartItem Component:
 * Displays all plant items currently added to the shopping cart,
 * provides controls to increase, decrease, or remove item quantities,
 * and displays total item count, total price, and navigation/checkout buttons.
 */
const CartItem = ({ onContinueShopping }) => {
  // Retrieve the cart items array from Redux state
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculates the grand total cost for all items in the cart.
   * Strips the '$' symbol from unit costs and multiplies by the item quantity.
   * @returns {number} Grand total amount
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const numericCost = parseFloat(item.cost.toString().replace(/[^0-9.]/g, '')) || 0;
      return total + numericCost * item.quantity;
    }, 0);
  };

  /**
   * Calculates the total number of individual plant items across the entire cart.
   * @returns {number} Total quantity of all plants in cart
   */
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calculates the subtotal cost for a specific item row.
   * @param {Object} item - The cart item object
   * @returns {number} Subtotal for this plant type
   */
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.toString().replace(/[^0-9.]/g, '')) || 0;
    return numericCost * item.quantity;
  };

  /**
   * Handler to return to the product listing page.
   * Invokes the callback prop passed from ProductList.
   */
  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    onContinueShopping(e);
  };

  /**
   * Increments the quantity of the given item by 1.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Decrements the quantity of the given item by 1.
   * If the quantity reaches 1 and decrement is clicked, the item is removed from the cart.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, decrementing removes the item completely
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Completely removes an item from the cart regardless of quantity.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Checkout button handler: Displays "Coming Soon" notification modal/alert.
   */
  const handleCheckoutShopping = () => {
    alert('Coming Soon! Checkout functionality is currently under development.');
  };

  return (
    <div className="cart-container">
      {/* Total Cart Amount and Total Quantity Summary Card */}
      <div className="cart-summary-card">
        <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
        <h3>Total Plants in Cart: {calculateTotalQuantity()}</h3>
      </div>

      {/* Render Cart Items */}
      {cart.length === 0 ? (
        <div className="empty-cart-state">
          <p>Your shopping cart is currently empty.</p>
        </div>
      ) : (
        <div className="cart-items-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              {/* Plant Thumbnail */}
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                {/* Plant Name and Unit Price */}
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>

                {/* Quantity Controls: Decrement, Value, Increment */}
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                {/* Row Subtotal */}
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>

                {/* Delete Button */}
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  aria-label={`Delete ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons: Continue Shopping and Checkout */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
