import "../css/ProductTable.css";

function ProductTable({ products, loading, onEdit, onDelete, onRestore }) {
  // ==================================
  // Loading
  // ==================================

  if (loading) {
    return <h3 className="product-table-state">Loading Products...</h3>;
  }

  // ==================================
  // Empty State
  // ==================================

  if (products.length === 0) {
    return <h3 className="product-table-state">No Products Found</h3>;
  }
  return (
    <div className="product-table-container">
      <div className="product-table-header">
        <div>
          <h2>Product List</h2>
          <p>Manage your products and inventory</p>
        </div>
      </div>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>

                <td className="product-name">{product.name}</td>

                <td>{product.category?.name}</td>

                <td>₹ {product.costPrice}</td>

                <td>₹ {product.sellingPrice}</td>

                <td>{product.quantity}</td>

                <td>
                  {product.isDeleted ? (
                    <span className="product-status deleted">
                      <span className="status-dot"></span>
                      Deleted
                    </span>
                  ) : (
                    <span className="product-status active">
                      <span className="status-dot"></span>
                      Active
                    </span>
                  )}
                </td>

                <td className="product-actions">
                  {!product.isDeleted ? (
                    <>
                      <button
                        className="product-edit-btn"
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="product-delete-btn"
                        onClick={() => onDelete(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="product-restore-btn"
                      onClick={() => onRestore(product._id)}
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
