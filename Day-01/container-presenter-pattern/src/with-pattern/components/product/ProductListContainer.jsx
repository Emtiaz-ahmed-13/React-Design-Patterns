import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProductListPresenter from "./ProductListPresenter";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart state: { productId, quantity, price, title }
  const [cartItems, setCartItems] = useState([]);

  // UI criteria owned by container (presenter renders controls and triggers callbacks)
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );
      setProducts(response.data || []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchProducts();
  };

  // Business logic: derive visible products based on criteria
  const visibleProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter && categoryFilter !== "all") {
      list = list.filter((p) => (p.category || "").toLowerCase() === categoryFilter.toLowerCase());
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "price") {
        return ((a.price || 0) - (b.price || 0)) * dir;
      }
      if (sortBy === "name") {
        return (a.title || "").localeCompare(b.title || "") * dir;
      }
      if (sortBy === "rating") {
        return ((a.rating || 0) - (b.rating || 0)) * dir;
      }
      return 0;
    });

    return list;
  }, [products, sortBy, sortDir, categoryFilter, searchQuery]);

  // Cart management business logic
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          quantity: 1,
          price: product.price,
          title: product.title,
        },
      ];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const cartTotals = useMemo(() => {
    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cartItems.reduce((sum, i) => sum + i.quantity * (i.price || 0), 0);
    return { totalItems, totalPrice };
  }, [cartItems]);

  const onSortChange = (nextSortBy, nextSortDir) => {
    setSortBy(nextSortBy);
    setSortDir(nextSortDir);
  };

  const onFilterChange = ({ category, search }) => {
    if (typeof category !== "undefined") setCategoryFilter(category);
    if (typeof search !== "undefined") setSearchQuery(search);
  };

  return (
    <ProductListPresenter
      products={visibleProducts}
      loading={loading}
      error={error}
      sortBy={sortBy}
      sortDir={sortDir}
      category={categoryFilter}
      search={searchQuery}
      onSortChange={onSortChange}
      onFilterChange={onFilterChange}
      onAddToCart={handleAddToCart}
      onRetry={handleRetry}
      cartItems={cartItems}
      cartTotals={cartTotals}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
};

export default ProductListContainer;


