const CartSummary = ({ items, totals, onRemoveItem, onUpdateQuantity }) => {
  return (
    <div className="cart-summary">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {items.map((i) => (
            <div key={i.productId} className="cart-item">
              <div className="cart-item-main">
                <span className="cart-title">{i.title}</span>
                <span className="cart-price">${(i.price || 0).toFixed(2)}</span>
              </div>

              <div className="cart-controls">
                <label>
                  Qty
                  <input
                    type="number"
                    min="0"
                    value={i.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(i.productId, Math.max(0, Number(e.target.value)))
                    }
                  />
                </label>
                <button className="btn btn-text" onClick={() => onRemoveItem(i.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-totals">
        <span>
          Items: <strong>{totals.totalItems}</strong>
        </span>
        <span>
          Total: <strong>${totals.totalPrice.toFixed(2)}</strong>
        </span>
      </div>
    </div>
  );
};

export default CartSummary;


