import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import SortFilterControls from "./presenters/SortFilterControls";

const ProductPresenter = ({
  products,
  loading,
  error,
  sortBy,
  sortDir,
  category,
  search,
  onSortChange,
  onFilterChange,
  onRetry
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Products</h1>
        <p>Browse our collection of quality products</p>
      </div>
      
      <SortFilterControls
        sortBy={sortBy}
        sortDir={sortDir}
        category={category}
        search={search}
        onSortChange={onSortChange}
        onFilterChange={onFilterChange}
      />
      
      {products.length === 0 ? (
        <div className="no-products-message">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  {"★".repeat(Math.floor(product.rating || 0))}{"☆".repeat(5 - Math.floor(product.rating || 0))}
                  <span>({product.rating || 0})</span>
                </div>
                <div className="product-price">${product.price}</div>
                <div className="product-actions">
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPresenter;