import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const discountedPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <span className="category">{product.category}</span>

      <h2>{product.title}</h2>

      <p className="brand">{product.brand}</p>

      <p className="description">{product.description}</p>

      <div className="rating">
        ⭐ {product.rating} ({product.reviews} Reviews)
      </div>

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
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductCard;