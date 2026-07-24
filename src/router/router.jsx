import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayoout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import Cart from "../pages/public/Cart";
import Dashboard from "../pages/admin/Dashboard";
import AddProduct from "../pages/admin/AddProduct";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  },
   {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ]
  }
]);

export default router;




