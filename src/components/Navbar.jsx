
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import "../style/Navbar.css";

function Navbar() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "CartContext is unavailable. Check the CartProvider import and wrapper."
    );
  }

  const { cart = [] } = context;

  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span>Nexus</span>Store
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
        </nav>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>

        <div className="nav-icons">
          <Link
            to="/cart"
            className="icon"
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="badge">{totalItems}</span>
            )}
          </Link>

          <Link to="/login" className="login-btn">
            <FaUser />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
