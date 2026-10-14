import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProducts,
  deleteProduct,
  restoreProduct,
  permanentlyDeleteProduct,
} from "../../api/productApi";

import "../../style/Dashboard.css";

function Dashboard() {
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState("");

  // Fetch products
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Soft delete: move product to Deleted Products
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setActionError("");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      setActionError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete product."
      );
    },
  });

  // Restore product
  const restoreMutation = useMutation({
    mutationFn: restoreProduct,
    onSuccess: () => {
      setActionError("");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      setActionError(
        error.response?.data?.message ||
          error.message ||
          "Failed to restore product."
      );
    },
  });

  // Permanently delete product
  const permanentDeleteMutation = useMutation({
    mutationFn: permanentlyDeleteProduct,
    onSuccess: () => {
      setActionError("");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      setActionError(
        error.response?.data?.message ||
          error.message ||
          "Failed to permanently delete product."
      );
    },
  });

  // Soft delete handler
  function handleDelete(product) {
    const confirmed = window.confirm(
      `Move "${product.title}" to Deleted Products?`
    );

    if (confirmed) {
      setActionError("");
      deleteMutation.mutate(product.id);
    }
  }

  // Restore handler
  function handleRestore(product) {
    const confirmed = window.confirm(
      `Restore "${product.title}"?`
    );

    if (confirmed) {
      setActionError("");
      restoreMutation.mutate(product.id);
    }
  }

  // Permanent delete handler
  function handlePermanentDelete(product) {
    const confirmed = window.confirm(
      `Permanently delete "${product.title}"? This cannot be undone.`
    );

    if (confirmed) {
      setActionError("");
      permanentDeleteMutation.mutate(product.id);
    }
  }

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="error">
        Failed to load products.
        <p>{error?.message}</p>
      </div>
    );
  }

  // Separate active and deleted products
  const activeProducts = data.filter(
    (product) => !product.isDeleted
  );

  const deletedProducts = data.filter(
    (product) => product.isDeleted
  );

  // Dashboard statistics
  const totalProducts = activeProducts.length;

  const totalStock = activeProducts.reduce(
    (total, product) =>
      total + (Number(product.stock) || 0),
    0
  );

  const totalInventoryValue = activeProducts.reduce(
    (total, product) =>
      total +
      (Number(product.price) || 0) *
        (Number(product.stock) || 0),
    0
  );

  const inStockProducts = activeProducts.filter(
    (product) => Number(product.stock) > 0
  ).length;

  const outOfStockProducts =
    totalProducts - inStockProducts;

  // Reusable product table
  function renderProductTable(products, showRestore) {
    return (
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => {
                const stock = Number(product.stock) || 0;

                const isDeleting =
                  deleteMutation.isPending &&
                  deleteMutation.variables === product.id;

                const isRestoring =
                  restoreMutation.isPending &&
                  restoreMutation.variables === product.id;

                const isPermanentlyDeleting =
                  permanentDeleteMutation.isPending &&
                  permanentDeleteMutation.variables ===
                    product.id;

                const isPending =
                  isDeleting ||
                  isRestoring ||
                  isPermanentlyDeleting;

                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                      />
                    </td>

                    <td>{product.title}</td>

                    <td>
                      {product.category || "Uncategorized"}
                    </td>

                    <td className="price">
                      {(Number(product.price) || 0).toLocaleString(
                        "en-IN",
                        {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td>{stock}</td>

                    <td>
                      <span
                        className={`status ${
                          stock > 0
                            ? "in-stock"
                            : "out-of-stock"
                        }`}
                      >
                        {stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </td>

                    <td>
                      {showRestore ? (
                        <>
                          <button
                            type="button"
                            className="restore-product-btn"
                            disabled={isPending}
                            onClick={() =>
                              handleRestore(product)
                            }
                          >
                            {isRestoring
                              ? "Restoring..."
                              : "Restore"}
                          </button>

                          <button
                            type="button"
                            className="delete-product-btn"
                            style={{ marginLeft: "8px" }}
                            disabled={isPending}
                            onClick={() =>
                              handlePermanentDelete(product)
                            }
                          >
                            {isPermanentlyDeleting
                              ? "Deleting..."
                              : "Delete Permanently"}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="delete-product-btn"
                          disabled={isPending}
                          onClick={() => handleDelete(product)}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">
                  {showRestore
                    ? "No deleted products."
                    : "No active products found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your Nexus E-Commerce products</p>
        </div>
      </div>

      {actionError && (
        <div className="error">{actionError}</div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h2>{totalProducts}</h2>
          <p>Active Products</p>
        </div>

        <div className="stat-card">
          <h2>{totalStock}</h2>
          <p>Total Stock Units</p>
        </div>

        <div className="stat-card">
          <h2>
            {totalInventoryValue.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            })}
          </h2>
          <p>Total Inventory Value</p>
        </div>

        <div className="stat-card">
          <h2>{inStockProducts}</h2>
          <p>Products In Stock</p>
        </div>

        <div className="stat-card">
          <h2>{outOfStockProducts}</h2>
          <p>Out of Stock</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Active Products</h2>
        {renderProductTable(activeProducts, false)}
      </div>

      <div className="table-card deleted-products-section">
        <h2>
          Deleted Products ({deletedProducts.length})
        </h2>
        {renderProductTable(deletedProducts, true)}
      </div>
    </div>
  );
}

export default Dashboard;