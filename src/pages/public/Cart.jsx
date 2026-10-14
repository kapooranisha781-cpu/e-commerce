import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import "../../style/Cart.css";

function Cart() {
  const { cart, dispatch } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Total number of products
  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  // Total amount
  const total = cart.reduce((sum, item) => {
    const price = Math.max(0, Number(item.price) || 0);
    const quantity = Math.max(0, Number(item.quantity) || 0);

    return sum + price * quantity;
  }, 0);

  // Show order confirmation after checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;

    setOrderConfirmed(true);
    dispatch({ type: "CLEAR_CART" });
  };

  // Order confirmation screen
  if (orderConfirmed) {
    return (
      <section className="cart-page">
        <div className="order-success">
          <span className="success-icon">✓</span>

          <h2>Order Confirmed!</h2>

          <p>Your order has been confirmed successfully.</p>
          <p>Thank you for shopping with Nexus Store!</p>

          <button
            type="button"
            className="okay-btn"
            onClick={() => {
              setOrderConfirmed(false);
              window.location.href = "/";
            }}
          >
            Okay
          </button>
        </div>
      </section>
    );
  }


  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Your Cart is Empty</h1>
        <p>Looks like you haven't added any products yet.</p>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{totalItems} Item(s) in your cart</p>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-row total">
          <span>Total Amount</span>
          <strong>₹{total.toLocaleString("en-IN")}</strong>
        </div>

        <div className="cart-actions">
          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <button
            type="button"
            className="clear-cart-btn"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
