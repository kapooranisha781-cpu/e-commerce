import { useState } from "react";
import { useAddProduct } from "../../hooks/useAddProduct";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addMutation = useAddProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price: Number(price),
      image,
    };

    addMutation.mutate(newProduct);

    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;