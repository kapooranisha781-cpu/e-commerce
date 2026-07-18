import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import Cart from "../pages/public/Cart";

import Dashboard from "../pages/admin/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";

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
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  }
]);

export default router;