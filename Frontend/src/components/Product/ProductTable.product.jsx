import "../../css/ProductTable.css";

function ProductTable({
  products = [],
  loading,
  onEdit,
  onDelete,
  onRestore,
  onRefresh,
}) {
  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="inv-product-table-state">
        Loading Products...
      </div>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================

  if (products.length === 0) {
    return (
      <div className="inv-product-table">

        <div className="inv-product-table-header">
          <div>
            <h2>Product List</h2>

            <p>
              Manage your products and inventory
            </p>
          </div>
        </div>

        <div className="inv-product-table-empty">
          No Products Found
        </div>

      </div>
    );
  }

  return (
    <div className="inv-product-table">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="inv-product-table-header">

        <div>

          <h2>
            Product List
          </h2>

          <p>
            Manage your products and inventory
          </p>

        </div>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="inv-product-table-toolbar">

        <div className="inv-product-table-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
          />

        </div>


        <select
          className="inv-product-table-filter"
        >
          <option>
            All Categories
          </option>

          <option>
            Active Products
          </option>

          <option>
            Deleted Products
          </option>

        </select>


        <button
          type="button"
          className="inv-product-table-refresh"
          onClick={onRefresh}
        >
          ↻ Refresh
        </button>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="inv-product-table-wrapper">

        <table>

          <colgroup>

            <col className="inv-product-col-number" />
            <col className="inv-product-col-name" />
            <col className="inv-product-col-category" />
            <col className="inv-product-col-cost" />
            <col className="inv-product-col-selling" />
            <col className="inv-product-col-quantity" />
            <col className="inv-product-col-status" />
            <col className="inv-product-col-actions" />

          </colgroup>


          <thead>

            <tr>

              <th>#</th>

              <th>
                Product Name
              </th>

              <th>
                Category
              </th>

              <th>
                Cost Price
              </th>

              <th>
                Selling Price
              </th>

              <th>
                Quantity
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {products.map((product, index) => (

              <tr key={product._id}>

                {/* NUMBER */}

                <td className="inv-product-table-number">
                  {index + 1}
                </td>


                {/* NAME */}

                <td className="inv-product-table-name">
                  {product.name}
                </td>


                {/* CATEGORY */}

                <td className="inv-product-table-category">
                  {product.category?.name || "-"}
                </td>


                {/* COST */}

                <td className="inv-product-table-price">
                  ₹ {product.costPrice}
                </td>


                {/* SELLING */}

                <td className="inv-product-table-price">
                  ₹ {product.sellingPrice}
                </td>


                {/* QUANTITY */}

                <td className="inv-product-table-quantity">
                  {product.quantity}
                </td>


                {/* STATUS */}

                <td>

                  {product.isDeleted ? (

                    <span className="inv-product-status inv-product-status-deleted">

                      <span className="inv-product-status-dot"></span>

                      Deleted

                    </span>

                  ) : (

                    <span className="inv-product-status inv-product-status-active">

                      <span className="inv-product-status-dot"></span>

                      Active

                    </span>

                  )}

                </td>


                {/* ACTIONS */}

                <td className="inv-product-table-actions">

                  {!product.isDeleted ? (

                    <>

                      <button
                        type="button"
                        className="inv-product-edit-btn"
                        onClick={() =>
                          onEdit(product)
                        }
                      >
                        Edit
                      </button>


                      <button
                        type="button"
                        className="inv-product-delete-btn"
                        onClick={() =>
                          onDelete(product._id)
                        }
                      >
                        Delete
                      </button>

                    </>

                  ) : (

                    <button
                      type="button"
                      className="inv-product-restore-btn"
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


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="inv-product-table-footer">

        <span>
          Showing 1 to {products.length} of{" "}
          {products.length} products
        </span>


        <div className="inv-product-pagination">

          <button
            type="button"
            disabled
          >
            ‹
          </button>

          <button
            type="button"
            className="inv-product-pagination-current"
          >
            1
          </button>

          <button
            type="button"
            disabled
          >
            ›
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductTable;