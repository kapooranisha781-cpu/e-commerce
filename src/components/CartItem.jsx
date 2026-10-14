import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../style/CartItem.css";

function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  // Price is already discounted in ProductCard.jsx
  const price = Math.max(0, Number(item.price) || 0);

  const quantity = Math.max(
    1,
    Math.floor(Number(item.quantity) || 1)
  );

  const stock = Math.max(0, Number(item.stock) || 0);

  const discount = Math.min(
    100,
    Math.max(0, Number(item.discount) || 0)
  );

  function handleQuantityChange(newQuantity) {
    if (newQuantity < 1 || newQuantity > stock) {
      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        quantity: newQuantity,
      },
    });
  }

  function handleRemove() {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item.id,
    });
  }

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title || "Product"}
        loading="lazy"
      />

      <div className="cart-details">
        <h2>{item.title || "Untitled Product"}</h2>

        {item.brand && (
          <p className="cart-brand">{item.brand}</p>
        )}

        <p className="cart-price">
          Price: ₹{price.toLocaleString("en-IN")}
        </p>

        {discount > 0 && (
          <p className="cart-discount">
            {discount}% OFF
          </p>
        )}

        <div className="quantity">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label={`Decrease quantity of ${item.title || "product"}`}
          >
            -
          </button>

          <span aria-live="polite">{quantity}</span>

          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stock}
            aria-label={`Increase quantity of ${item.title || "product"}`}
          >
            +
          </button>
        </div>

        {stock > 0 && (
          <p className="cart-stock">
            {stock - quantity} available
          </p>
        )}

        <p className="subtotal">
          <strong>Subtotal:</strong>{" "}
          ₹{(price * quantity).toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          className="remove-btn"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
