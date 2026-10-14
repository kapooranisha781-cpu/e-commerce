
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../style/ProductCard.css";

function ProductCard({ product }) {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "ProductCard must be rendered inside CartProvider"
    );
  }

  const { cart, dispatch } = context;

  const isAdded = cart.some(
    (item) => String(item.id) === String(product.id)
  );

  // Safely handle price
  const price = Math.max(0, Number(product.price) || 0);

  // Keep discount between 0 and 100
  const discount = Math.min(
    100,
    Math.max(0, Number(product.discount) || 0)
  );

  // Calculate discounted price
  const discountedPrice = Math.round(
    price - (price * discount) / 100
  );

  // Safely handle stock
  const stock = Math.max(
    0,
    Math.floor(Number(product.stock) || 0)
  );

  const handleAddToCart = () => {
    if (isAdded || stock <= 0) return;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        price: discountedPrice,
        stock,
      },
    });
  };

  return (
    <div className="product-card">
      <div className="image-box">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title || "Product"}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <span className="category">
          {product.category || "General"}
        </span>

        <h2>{product.title || "Untitled Product"}</h2>

        {product.brand && (
          <p className="brand">{product.brand}</p>
        )}

        {product.description && (
          <p className="description">
            {product.description}
          </p>
        )}

        <p className="rating">
          ⭐ {Number(product.rating) || 0} (
          {Number(product.reviews) || 0} Reviews)
        </p>

        <div className="price-section">
          <span className="new-price">
            ₹{discountedPrice.toLocaleString("en-IN")}
          </span>

          {discount > 0 && (
            <>
              <span className="old-price">
                ₹{price.toLocaleString("en-IN")}
              </span>

              <span className="discount">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        <p className="stock">
          {stock > 0 ? `Only ${stock} left` : "Out of Stock"}
        </p>

        <button
          type="button"
          className={`add-cart ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={stock <= 0 || isAdded}
          aria-label={
            stock <= 0
              ? `${product.title || "Product"} is out of stock`
              : isAdded
              ? `${product.title || "Product"} is already in cart`
              : `Add ${product.title || "product"} to cart`
          }
        >
          {stock <= 0
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
