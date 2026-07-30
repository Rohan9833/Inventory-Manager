import { useEffect, useState } from "react";
import { getProductReport } from "../api/reports.api";

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
    <div>
      <h2>Product Report</h2>

      {/* ==========================
          Summary
      ========================== */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <strong>Total Products</strong>
          <p>{summary.totalProducts}</p>
        </div>

        <div>
          <strong>Total Stock</strong>
          <p>{summary.totalStock}</p>
        </div>

        <div>
          <strong>Total Cost Value</strong>
          <p>₹{summary.totalCostValue}</p>
        </div>

        <div>
          <strong>Total Selling Value</strong>
          <p>₹{summary.totalSellingValue}</p>
        </div>

        <div>
          <strong>Low Stock</strong>
          <p>{summary.lowStockProducts}</p>
        </div>

        <div>
          <strong>Out Of Stock</strong>
          <p>{summary.outOfStockProducts}</p>
        </div>
      </div>

      <hr />

      {/* ==========================
          Filters
      ========================== */}

      <input
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

      <select
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

      <select
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

      <hr />

      {/* ==========================
          Table
      ========================== */}

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
        >
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
                <td>{product.name}</td>

                <td>
                  {product.category?.name}
                </td>

                <td>
                  ₹{product.costPrice}
                </td>

                <td>
                  ₹{product.sellingPrice}
                </td>

                <td>
                  {product.quantity}
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
      )}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          disabled={
            pagination.page === 1
          }
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
        >
          Previous
        </button>

        <span>
          {" "}
          Page {pagination.page} of{" "}
          {pagination.totalPages}
        </span>

        <button
          disabled={
            pagination.page ===
            pagination.totalPages
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