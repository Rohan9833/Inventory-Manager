function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
  onRestore,
}) {
  // ==================================
  // Loading
  // ==================================

  if (loading) {
    return <h3>Loading Products...</h3>;
  }

  // ==================================
  // Empty State
  // ==================================

  if (products.length === 0) {
    return <h3>No Products Found</h3>;
  }

  return (
    <div>
      <h2>Product List</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
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

              <td>{product.name}</td>

              <td>{product.category?.name}</td>

              <td>₹ {product.costPrice}</td>

              <td>₹ {product.sellingPrice}</td>

              <td>{product.quantity}</td>

              <td>
                {product.isDeleted ? (
                  <span>🔴 Deleted</span>
                ) : (
                  <span>🟢 Active</span>
                )}
              </td>

              <td>
                {!product.isDeleted ? (
                  <>
                    <button
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </button>

                    {" "}

                    <button
                      onClick={() =>
                        onDelete(product._id)
                      }
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      onRestore(product._id)
                    }
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
  );
}

export default ProductTable;