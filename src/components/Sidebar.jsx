import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Nexus Admin</h2>

      <hr />

      <p>
        <Link to="/admin/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>
      </p>

      <p>
        <Link to="/admin/add-product" style={{ color: "white" }}>
          Add Product
        </Link>
      </p>

      {/* <p>
        <Link to="/admin/products" style={{ color: "white" }}>
          Products
        </Link>
      </p>

      <p>
        <Link to="/admin/orders" style={{ color: "white" }}>
          Orders
        </Link>
      </p> */}
    </div>
  );
}

export default Sidebar;







