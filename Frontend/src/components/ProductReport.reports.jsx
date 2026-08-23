import { useEffect, useState } from "react";
import { getProductReport } from "../api/reports.api";
import "../css/ProductReport.css";

function ProductReport() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    stockStatus: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Report
  // ==========================

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await getProductReport(filters);

      setProducts(response.products || []);
      setSummary(response.summary || {});
      setPagination(response.pagination || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filters]);

  return (
    <div className="product-report">
      {/* ==========================
          Header
      ========================== */}

      <div className="product-report-header">
        <div>
          <h2 className="product-report-title">
            Product Report
          </h2>

          <p className="product-report-subtitle">
            Overview of your products and stock performance
          </p>
        </div>
      </div>

      {/* ==========================
          Summary
      ========================== */}

      <div className="product-report-summary">
        <div className="product-report-card">
          <span className="product-report-card-label">
            Total Products
          </span>

          <strong className="product-report-card-value">
            {summary.totalProducts || 0}
          </strong>
        </div>

        <div className="product-report-card">
          <span className="product-report-card-label">
            Total Stock
          </span>

          <strong className="product-report-card-value">
            {summary.totalStock || 0}
          </strong>
        </div>

        <div className="product-report-card">
          <span className="product-report-card-label">
            Total Cost Value
          </span>

          <strong className="product-report-card-value">
            ₹{summary.totalCostValue || 0}
          </strong>
        </div>

        <div className="product-report-card">
          <span className="product-report-card-label">
            Total Selling Value
          </span>

          <strong className="product-report-card-value">
            ₹{summary.totalSellingValue || 0}
          </strong>
        </div>

        <div className="product-report-card product-report-card-warning">
          <span className="product-report-card-label">
            Low Stock
          </span>

          <strong className="product-report-card-value">
            {summary.lowStockProducts || 0}
          </strong>
        </div>

        <div className="product-report-card product-report-card-danger">
          <span className="product-report-card-label">
            Out Of Stock
          </span>

          <strong className="product-report-card-value">
            {summary.outOfStockProducts || 0}
          </strong>
        </div>
      </div>

      {/* ==========================
          Filters
      ========================== */}

      <div className="product-report-filter-section">
        <div className="product-report-filter-group">
          <label className="product-report-filter-label">
            Search
          </label>

          <input
            className="product-report-input"
            type="text"
            placeholder="Search Product"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
        </div>

        <div className="product-report-filter-group">
          <label className="product-report-filter-label">
            Stock Status
          </label>

          <select
            className="product-report-select"
            value={filters.stockStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                stockStatus: e.target.value,
                page: 1,
              }))
            }
          >
            <option value="">All</option>
            <option value="AVAILABLE">Available</option>
            <option value="LOW">Low Stock</option>
            <option value="OUT">Out Of Stock</option>
          </select>
        </div>

        <div className="product-report-filter-group">
          <label className="product-report-filter-label">
            Sort By
          </label>

          <select
            className="product-report-select"
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value,
              }))
            }
          >
            <option value="">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* ==========================
          Table
      ========================== */}

      <div className="product-report-table-section">
        <div className="product-report-table-header">
          <div>
            <h3>Products</h3>

            <p>
              Showing product details and stock information
            </p>
          </div>
        </div>

        {loading ? (
          <div className="product-report-state">
            <h3>Loading...</h3>
          </div>
        ) : products.length === 0 ? (
          <div className="product-report-state">
            <h3>No Products Found</h3>

            <p>
              No products match the selected filters.
            </p>
          </div>
        ) : (
          <div className="product-report-table-wrapper">
            <table className="product-report-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Cost</th>
                  <th>Selling</th>
                  <th>Quantity</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="product-report-product-name">
                      {product.name}
                    </td>

                    <td>
                      {product.category?.name || "-"}
                    </td>

                    <td>
                      ₹{product.costPrice}
                    </td>

                    <td>
                      ₹{product.sellingPrice}
                    </td>

                    <td>
                      <span
                        className={
                          product.quantity === 0
                            ? "product-report-stock-out"
                            : "product-report-stock"
                        }
                      >
                        {product.quantity}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        product.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================
          Pagination
      ========================== */}

      <div className="product-report-pagination">
        <button
          className="product-report-pagination-btn"
          disabled={pagination.page === 1}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
        >
          Previous
        </button>

        <span className="product-report-pagination-info">
          Page {pagination.page || 1} of{" "}
          {pagination.totalPages || 1}
        </span>

        <button
          className="product-report-pagination-btn"
          disabled={
            pagination.page === pagination.totalPages ||
            !pagination.totalPages
          }
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductReport;