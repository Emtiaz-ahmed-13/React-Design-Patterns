


const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="product-image"
        loading="lazy"
      />
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-price">${product.price?.toFixed(2)}</span>
          {typeof product.rating !== "undefined" && (
            <span className="product-rating">⭐ {product.rating}</span>
          )}
        </div>
        <button className="btn" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


