import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../api/productApi";
import "../../style/AddProduct.css";

function AddProduct() {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["products"]
      });
      alert("Product Added Successfully!");
      setProduct({
        title:"",
        price:"",
        category:"",
        image:"",
        stock:"",
      });
    }
  });

  function handleChange(e){
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    if(
      !product.title ||
      !product.price ||
      !product.category ||
      !product.image ||
      !product.stock
    ){

      alert("Please fill all fields");
      return;
    }
    addMutation.mutate({
      ...product,
      price:Number(product.price),
      stock:Number(product.stock),
    });
  }

  return (
    <div className="add-product-page">
      <div className="product-form-card">
        <h1>Add Product</h1>
        <p>
          Add a new product to Nexus Store
        </p>
        <form 
        onSubmit={handleSubmit}
        className="product-form">

          <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={product.title}
          onChange={handleChange}/>

          <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange} />

          <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}/>

          <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}/>

          <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange} />

          <button 
          type="submit"
          disabled={addMutation.isPending}>

          {
            addMutation.isPending
            ?
            "Adding..."
            :
            "Add Product"
          }

          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProduct;