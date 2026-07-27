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

  const filteredProducts = products.filter(({ title, brand, category }) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      title.toLowerCase().includes(keyword) ||
      brand.toLowerCase().includes(keyword) ||
      category.toLowerCase().includes(keyword)
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

        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div className="empty-products">
            <h2>No Products Found</h2>
            <p>
              Try searching with another keyword.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Products;