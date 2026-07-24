import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  const discountedPrice = Math.round(
    item.price - (item.price * item.discount) / 100
  );

  return (
    <div className="cart-item">

      <img
        src={item.image}
        alt={item.title}
      />

      <div className="cart-details">

        <h2>{item.title}</h2>

        <p className="cart-brand">
          {item.brand}
        </p>

        <p className="cart-price">
          Price: ₹{discountedPrice.toLocaleString()}
        </p>

        <div className="quantity">

          <button
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: {
                  id: item.id,
                  quantity: item.quantity - 1,
                },
              })
            }
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: {
                  id: item.id,
                  quantity: item.quantity + 1,
                },
              })
            }
          >
            +
          </button>

        </div>

        <p className="subtotal">
          <strong>Subtotal :</strong> ₹
          {(discountedPrice * item.quantity).toLocaleString()}
        </p>

        <button
          className="remove-btn"
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: item.id,
            })
          }
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;