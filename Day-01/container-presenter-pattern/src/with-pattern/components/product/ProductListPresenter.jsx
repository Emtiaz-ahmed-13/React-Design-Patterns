import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import CartSummary from "./presenters/CartSummary";
import ProductCard from "./presenters/ProductCard";
import SortFilterControls from "./presenters/SortFilterControls";

const ProductListPresenter = ({
  products,
  loading,
  error,
  sortBy,
  sortDir,
  category,
  search,
  onSortChange,
  onFilterChange,
  onAddToCart,
  onRetry,
  cartItems,
  cartTotals,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Unable to load products"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="product-page">
      <SortFilterControls
        sortBy={sortBy}
        sortDir={sortDir}
        category={category}
        search={search}
        onSortChange={onSortChange}
        onFilterChange={onFilterChange}
      />

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={() => onAddToCart(p)} />)
        )}
      </div>

      <CartSummary
        items={cartItems}
        totals={cartTotals}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
};

export default ProductListPresenter;


