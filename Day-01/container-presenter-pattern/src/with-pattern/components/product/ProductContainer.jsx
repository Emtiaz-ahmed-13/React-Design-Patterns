import axios from "axios";
import { useEffect, useState } from "react";
import ProductPresenter from "./ProductPresenter";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort state
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [products, sortBy, sortDir, category, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using your backend API
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSorting = () => {
    let result = [...products];
    
    // Apply search filter
    if (search) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category !== "all") {
      result = result.filter(product => product.category === category);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === "price") {
        aValue = a.price;
        bValue = b.price;
      } 
      else if (sortBy === "rating") {
        aValue = a.rating || 0;
        bValue = b.rating || 0;
      } 
      else {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }
      
      if (sortDir === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredProducts(result);
  };

  const handleSortChange = (newSortBy, newSortDir) => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
  };

  const handleFilterChange = (filterChanges) => {
    if (filterChanges.category !== undefined) {
      setCategory(filterChanges.category);
    }
    if (filterChanges.search !== undefined) {
      setSearch(filterChanges.search);
    }
  };

  const handleRetry = () => {
    fetchProducts();
  };

  return (
    <ProductPresenter
      products={filteredProducts}
      loading={loading}
      error={error}
      sortBy={sortBy}
      sortDir={sortDir}
      category={category}
      search={search}
      onSortChange={handleSortChange}
      onFilterChange={handleFilterChange}
      onRetry={handleRetry}
    />
  );
};

export default ProductContainer;