import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import useDebounce from "../../hooks/useDebounce";

import "../../style/Products.css";

function Products() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Deleted products ko public Products page par hide karo
  const activeProducts = products.filter(
    (product) => product.isDeleted !== true
  );

  // Search active products mein hi hoga
  const keyword = debouncedSearch.trim().toLowerCase();

  const filteredProducts = activeProducts.filter((product) => {
    const title = String(product.title || "").toLowerCase();
    const brand = String(product.brand || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();

    return (
      title.includes(keyword) ||
      brand.includes(keyword) ||
      category.includes(keyword)
    );
  });

  if (isLoading) {
    return (
      <section className="loading-container">
        <h2>Loading Products...</h2>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="error-container">
        <h2>Something went wrong!</h2>
        <p>Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="products-page">
      <div className="products-header">
        <span className="products-tag">
          Premium Collection
        </span>

        <h1>Explore Our Products</h1>

        <p>
          Discover premium smartphones, laptops, smartwatches,
          headphones, cameras and accessories designed for
          performance and style.
        </p>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div className="empty-products">
            <h2>
              {activeProducts.length === 0
                ? "No Products Available"
                : "No Products Found"}
            </h2>

            <p>
              {activeProducts.length === 0
                ? "Please check back later for new products."
                : "Try searching with another keyword."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
