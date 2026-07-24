import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import "../../style/Cart.css";

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  // Total number of products
  const totalItems = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Total price after discount
  const total = state.cart.reduce((sum, item) => {
    const discountedPrice = Math.round(
      item.price - (item.price * item.discount) / 100
    );

    return sum + discountedPrice * item.quantity;
  }, 0);

  if (state.cart.length === 0) {
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
        {state.cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-row">
          <span>Total Amount</span>
          <strong>₹{total.toLocaleString()}</strong>
        </div>

        <button className="checkout-btn">
          Proceed to Checkout
        </button>

        <button
          className="clear-cart-btn"
          onClick={() =>
            dispatch({
              type: "CLEAR_CART",
            })
          }
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}

export default Cart;