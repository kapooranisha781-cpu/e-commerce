import { NavLink, useNavigate } from "react-router-dom";
import "../style/Sidebar.css";


function Sidebar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");

    navigate("/login");

  };


  return (

    <aside className="sidebar">


      <h2>Nexus Admin</h2>


      <nav>


        <NavLink to="/admin/dashboard">
          🏠 Dashboard
        </NavLink>



        <NavLink to="/admin/add-product">
          ➕ Add Product
        </NavLink>



        <button 
        className="logout-btn"
        onClick={handleLogout}
        >
          🚪 Logout
        </button>


      </nav>


    </aside>

  );

}


export default Sidebar;