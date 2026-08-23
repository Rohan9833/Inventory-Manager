import "../css/CategoryTable.css";

function CategoryTable({ categories, loading, onEdit, onStatus }) {
  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="category-table-state">
        <h3>Loading Categories...</h3>
      </div>
    );
  }

  // ===========================
  // Empty State
  // ===========================

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="category-table-state">
        <h3>No Categories Found</h3>
      </div>
    );
  }

  return (
    <section className="category-table-container">
      {/* Header */}

      <div className="category-table-header">
        <div>
          <h2 className="category-table-title">
            Category List
          </h2>

          <p className="category-table-subtitle">
            Manage all your product categories
          </p>
        </div>

        <div className="category-table-count">
          {categories.length} Categories
        </div>
      </div>

      {/* Table */}

      <div className="category-table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                {/* Number */}

                <td className="category-table-number">
                  {index + 1}
                </td>

                {/* Name */}

                <td className="category-table-name">
                  {category.name}
                </td>

                {/* Description */}

                <td className="category-table-description">
                  {category.description || "-"}
                </td>

                {/* Status */}

                <td>
                  <span
                    className={`category-status ${
                      category.isActive
                        ? "category-status-active"
                        : "category-status-inactive"
                    }`}
                  >
                    <span className="category-status-dot"></span>

                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                {/* Created */}

                <td className="category-table-date">
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* Actions */}

                <td>
                  <div className="category-table-actions">
                    <button
                      className="category-action-edit"
                      onClick={() => onEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      className={
                        category.isActive
                          ? "category-action-deactivate"
                          : "category-action-activate"
                      }
                      onClick={() =>
                        onStatus(
                          category._id,
                          !category.isActive
                        )
                      }
                    >
                      {category.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CategoryTable;