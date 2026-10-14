import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="sidebar-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="admin-sidebar"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
      >
        <h2>Nexus Admin</h2>

        <nav>
          <NavLink
            to="/admin/dashboard"
            onClick={handleNavigation}
          >
            <span>🏠</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-product"
            onClick={handleNavigation}
          >
            <span>➕</span>
            Add Product
          </NavLink>

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          Nexus Store
          <span>Admin Panel</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
