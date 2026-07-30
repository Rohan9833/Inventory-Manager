import { useEffect, useState } from "react";
import { getInventoryReport } from "../api/reports.api";

function InventoryReport() {
  const [inventory, setInventory] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    type: "",
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

      const response =
        await getInventoryReport(filters);

      setInventory(response.inventory || []);
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
      <h2>Inventory Report</h2>

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
        value={filters.type}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            type: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="">All</option>
        <option value="IN">Stock In</option>
        <option value="OUT">Stock Out</option>
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
        <option value="quantity_asc">
          Quantity ↑
        </option>
        <option value="quantity_desc">
          Quantity ↓
        </option>
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
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.product?.name}
                </td>

                <td>{item.type}</td>

                <td>{item.quantity}</td>

                <td>
                  {item.reason || "-"}
                </td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ==========================
          Pagination
      ========================== */}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          disabled={
            pagination.currentPage === 1
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
          Page{" "}
          {pagination.currentPage} of{" "}
          {pagination.totalPages}
        </span>

        <button
          disabled={
            pagination.currentPage ===
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

export default InventoryReport;