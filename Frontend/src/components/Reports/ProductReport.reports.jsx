import { useEffect, useState } from "react";
import "../../css/ProductReport.css";

import { getProductReport } from "../../api/reports.api";

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

      <div className="product-report-header">

        <div>
          <span className="product-report-kicker">
            PRODUCT ANALYTICS
          </span>

          <h2 className="product-report-title">
            Product Report
          </h2>

          <p className="product-report-subtitle">
            Overview of your products and stock performance
          </p>
        </div>

      </div>


      {/* Summary */}

      <div className="product-report-summary">

        <div className="product-report-card">
          <span>Total Products</span>
          <strong>{summary.totalProducts || 0}</strong>
          <small>Products in catalog</small>
        </div>

        <div className="product-report-card">
          <span>Total Stock</span>
          <strong>{summary.totalStock || 0}</strong>
          <small>Current quantity</small>
        </div>

        <div className="product-report-card">
          <span>Cost Value</span>
          <strong>
            ₹{summary.totalCostValue || 0}
          </strong>
          <small>Total inventory cost</small>
        </div>

        <div className="product-report-card">
          <span>Selling Value</span>
          <strong>
            ₹{summary.totalSellingValue || 0}
          </strong>
          <small>Potential revenue</small>
        </div>

        <div className="product-report-card warning">
          <span>Low Stock</span>
          <strong>
            {summary.lowStockProducts || 0}
          </strong>
          <small>Needs attention</small>
        </div>

        <div className="product-report-card danger">
          <span>Out Of Stock</span>
          <strong>
            {summary.outOfStockProducts || 0}
          </strong>
          <small>Currently unavailable</small>
        </div>

      </div>


      {/* Filters */}

      <div className="product-report-filter-section">

        <div className="product-report-filter-heading">

          <div className="product-report-filter-icon">
            ⚙
          </div>

          <div>
            <h3>Filter Products</h3>
            <span>Customize your product report</span>
          </div>

        </div>

        <div className="product-report-filter-grid">

          <div className="product-report-filter-group">

            <label>Search</label>

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

            <label>Stock Status</label>

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

            <label>Sort By</label>

            <select
              className="product-report-select"
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                  page: 1,
                }))
              }
            >
              <option value="">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

          </div>

        </div>

      </div>


      {/* Table */}

      <div className="product-report-table-section">

        <div className="product-report-table-header">

          <div>
            <div className="product-report-table-title">
              <span>□</span>

              <div>
                <h3>Products</h3>

                <p>
                  Showing product details and stock information
                </p>
              </div>
            </div>
          </div>

          <span className="product-report-count">
            {products.length} Records
          </span>

        </div>


        {loading ? (

          <div className="product-report-state">
            <div className="product-report-loader"></div>
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


        {!loading && products.length > 0 && (

          <div className="product-report-pagination">

            <button
              disabled={
                !pagination.page ||
                pagination.page === 1
              }
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
            >
              ← Previous
            </button>

            <span>
              Page <strong>{pagination.page || 1}</strong>{" "}
              of{" "}
              <strong>
                {pagination.totalPages || 1}
              </strong>
            </span>

            <button
              disabled={
                !pagination.totalPages ||
                pagination.page >= pagination.totalPages
              }
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
            >
              Next →
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductReport;