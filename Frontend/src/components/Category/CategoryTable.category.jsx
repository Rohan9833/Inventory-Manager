import { useMemo, useState } from "react";
import "../../css/CategoryTable.css";

function CategoryTable({
  categories,
  loading,
  onEdit,
  onStatus,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ===========================
  // Product Count
  // ===========================

  const getProductCount = (category) => {
    if (typeof category.productCount === "number") {
      return category.productCount;
    }

    if (typeof category.productsCount === "number") {
      return category.productsCount;
    }

    if (Array.isArray(category.products)) {
      return category.products.length;
    }

    return 0;
  };

  // ===========================
  // Filter Categories
  // ===========================

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        category.name?.toLowerCase().includes(searchText) ||
        category.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category.isActive) ||
        (statusFilter === "inactive" && !category.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <section className="category-list-card">
        <div className="category-table-loading">
          <div className="category-loader"></div>
          <span>Loading categories...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="category-list-card">

      {/* ===========================
          TOP BAR
      =========================== */}

      <div className="category-list-top">
        <div>
          <h2>Category List</h2>

          <p>
            Manage all your product categories
          </p>
        </div>

        <span className="category-total-badge">
          {categories.length} Categories
        </span>
      </div>

      {/* ===========================
          FILTERS
      =========================== */}

      <div className="category-filters">
        <div className="category-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="category-status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Mobile Filter Icon */}
        <div className="category-mobile-filter-icon">
          <span>☷</span>
        </div>
      </div>

      {/* ===========================
          EMPTY
      =========================== */}

      {filteredCategories.length === 0 ? (
        <div className="category-table-empty">
          <div>□</div>

          <h3>No Categories Found</h3>

          <p>
            {search
              ? "Try a different search term."
              : "Create your first product category."}
          </p>
        </div>
      ) : (
        <>
          {/* ===========================
              DESKTOP TABLE
          =========================== */}

          <div className="category-table-wrapper">
            <table className="category-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map(
                  (category, index) => {
                    const productCount =
                      getProductCount(category);

                    return (
                      <tr key={category._id}>

                        <td className="category-number">
                          {index + 1}
                        </td>

                        <td>
                          <div className="category-name-cell">
                            <strong>
                              {category.name}
                            </strong>
                          </div>
                        </td>

                        <td className="category-description">
                          {category.description || "-"}
                        </td>

                        <td className="category-products">
                          {productCount}
                        </td>

                        <td>
                          <span
                            className={`category-status ${
                              category.isActive
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            <span className="status-dot"></span>

                            {category.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td className="category-date">
                          {category.createdAt
                            ? new Date(
                                category.createdAt
                              ).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </td>

                        <td>
                          <div className="category-actions">
                            <button
                              className="category-edit-btn"
                              onClick={() =>
                                onEdit(category)
                              }
                              title="Edit category"
                            >
                              ✎
                            </button>

                            <button
                              className={
                                category.isActive
                                  ? "category-toggle-btn deactivate"
                                  : "category-toggle-btn activate"
                              }
                              onClick={() =>
                                onStatus(
                                  category._id,
                                  !category.isActive
                                )
                              }
                              title={
                                category.isActive
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              {category.isActive
                                ? "−"
                                : "+"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* ===========================
              MOBILE CATEGORY LIST
          =========================== */}

          {/* <div className="category-mobile-list">
            {filteredCategories.map((category) => {
              const productCount =
                getProductCount(category);

              return (
                <div
                  className="category-mobile-item"
                  key={category._id}
                >
                  <div className="category-mobile-icon">
                    <span>◆</span>
                  </div>

                  <div className="category-mobile-info">
                    <strong>{category.name}</strong>

                    <span>
                      {productCount}{" "}
                      {productCount === 1
                        ? "product"
                        : "products"}
                    </span>
                  </div>

                  <button
                    className="category-mobile-arrow"
                    onClick={() => onEdit(category)}
                    title="Edit category"
                  >
                    ›
                  </button>

                  <button
                    className="category-mobile-more"
                    onClick={() =>
                      onStatus(
                        category._id,
                        !category.isActive
                      )
                    }
                    title={
                      category.isActive
                        ? "Deactivate"
                        : "Activate"
                    }
                  >
                    ⋮
                  </button>
                </div>
              );
            })}
          </div> */}

          {/* ===========================
              FOOTER
          =========================== */}

          <div className="category-table-footer">
            <span>
              Showing {filteredCategories.length} of{" "}
              {categories.length} categories
            </span>

            <div className="category-pagination">
              <button disabled>‹</button>
              <button className="current">1</button>
              <button disabled>›</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CategoryTable;