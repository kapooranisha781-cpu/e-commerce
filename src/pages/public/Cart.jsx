import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>No products added yet.</p>
      </div>
    );
  }
    <div>
      <h1>Shopping Cart</h1>

      {state.cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.title}</h3>

          <p>Price: ₹{item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <p>Subtotal: ₹{item.price * item.quantity}</p>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item.id,
              })
            }> Remove </button>
        </div>
      ))}
      <hr />
      <h2>Total: ₹{total}</h2>
    </div>
}

export default Cart;