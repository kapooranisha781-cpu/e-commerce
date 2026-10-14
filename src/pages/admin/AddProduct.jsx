import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../api/productApi";
import "../../style/AddProduct.css";

const initialProduct = {
  title: "",
  price: "",
  category: "",
  image: "",
  stock: "",
  brand: "",
  description: "",
  rating: "",
  reviews: "",
  discount: "",
};

function AddProduct() {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState(initialProduct);

  const addMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      alert("Product Added Successfully!");
      setProduct(initialProduct);
    },

    onError: (error) => {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product."
      );
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !product.title.trim() ||
      product.price === "" ||
      !product.category.trim() ||
      !product.image.trim() ||
      product.stock === ""
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const price = Number(product.price);
    const stock = Number(product.stock);
    const rating = Number(product.rating);
    const reviews = Number(product.reviews);
    const discount = Number(product.discount);

    if (!Number.isFinite(price) || price <= 0) {
      alert("Enter a valid price greater than zero.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      alert("Enter a valid stock quantity.");
      return;
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    if (!Number.isInteger(reviews) || reviews < 0) {
      alert("Reviews must be zero or a positive whole number.");
      return;
    }

    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      alert("Discount must be between 0 and 100.");
      return;
    }

    addMutation.mutate({
      title: product.title.trim(),
      price,
      category: product.category.trim(),
      image: product.image.trim(),
      stock,
      brand: product.brand.trim(),
      description: product.description.trim(),
      rating,
      reviews,
      discount,
      isDeleted: false,
    });
  }

  return (
    <div className="add-product-page">
      <div className="product-form-card">
        <h1>Add Product</h1>
        <p>Add a new product to Nexus Store</p>

        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="title"
            placeholder="Product Name *"
            value={product.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price *"
            min="0.01"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category *"
            value={product.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity *"
            min="0"
            step="1"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="image"
            placeholder="Image URL *"
            value={product.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand Name"
            value={product.brand}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            rows="4"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (0–5)"
            min="0"
            max="5"
            step="0.1"
            value={product.rating}
            onChange={handleChange}
          />

          <input
            type="number"
            name="reviews"
            placeholder="Number of Reviews"
            min="0"
            step="1"
            value={product.reviews}
            onChange={handleChange}
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            min="0"
            max="100"
            step="1"
            value={product.discount}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
