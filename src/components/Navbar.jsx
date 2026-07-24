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
  const { state } = useContext(CartContext);

  // Total items in cart
  const totalItems = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <span>Nexus</span>Store
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
        </nav>

        {/* Search */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Icons */}
        <div className="nav-icons">

          <Link to="/cart" className="icon">
            <FaShoppingCart />

            {totalItems > 0 && (
              <span className="badge">
                {totalItems}
              </span>
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