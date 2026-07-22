import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#2563eb",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/products" style={{ color: "white" }}>
        Products
      </Link>

      <Link to="/cart" style={{ color: "white" }}>
        Cart
      </Link>

      <Link to="/admin/dashboard" style={{ color: "white" }}>
        Admin
      </Link>
    </nav>
  );
}

export default Navbar;



