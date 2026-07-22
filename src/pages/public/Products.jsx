import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import useDebounce from "../../hooks/useDebounce";

function Products() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <h2>Loading Products...</h2>;

  if (isError) return <h2>Something went wrong!</h2>;

  const filteredProducts = data.filter((product) => {
    return (
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      product.brand.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Explore Our Products</h1>

        <p>
          Discover the latest smartphones, laptops, accessories, smartwatches,
          cameras and more.
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
          <h2>No Products Found.</h2>
        )}
      </div>
    </div>
  );
}

export default Products;