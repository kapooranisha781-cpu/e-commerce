import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../style/ProductCard.css";

function ProductCard({ product }) {
  const { state, dispatch } = useContext(CartContext);

  // Check if product is already in cart
  const isAdded = state.cart.some(
    (item) => item.id === product.id
  );

  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  const handleAddToCart = () => {
    if (isAdded) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  return (
    <div className="product-card">

      <div className="image-box">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-content">

        <span className="category">
          {product.category}
        </span>

        <h2>{product.title}</h2>

        <p className="brand">
          {product.brand}
        </p>

        <p className="description">
          {product.description}
        </p>

        <p className="rating">
          ⭐ {product.rating} ({product.reviews} Reviews)
        </p>

        <div className="price-section">

          <span className="new-price">
            ₹{discountedPrice.toLocaleString()}
          </span>

          <span className="old-price">
            ₹{product.price.toLocaleString()}
          </span>

          <span className="discount">
            {product.discount}% OFF
          </span>

        </div>

        <p className="stock">
          {product.stock > 0
            ? `Only ${product.stock} left`
            : "Out of Stock"}
        </p>

        <button
          className={`add-cart ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdded}
        >
          {product.stock === 0
            ? "Out of Stock"
            : isAdded
            ? "✓ Added"
            : "Add to Cart"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;