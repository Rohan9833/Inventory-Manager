import "../../css/StockCharts.css";

function StockCharts() {
  return (
    <section className="stock-charts">

      {/* Stock Movement */}
      <div className="stock-movement-card">
        <div className="stock-card-header">
          <h3>Stock Movement</h3>

          <div className="stock-card-controls">
            <span>● Inward</span>
            <span>● Outward</span>

            <button>Last 6 Months⌄</button>
          </div>
        </div>

        <div className="stock-chart">
          {/* Chart yahan baad me actual data/chart library se bana sakte hain */}
          <div className="chart-bars">
            {[
              ["Mar", 48, 63],
              ["Apr", 42, 52],
              ["May", 38, 55],
              ["Jun", 48, 35],
              ["Jul", 65, 48],
              ["Aug", 72, 58],
            ].map(([month, inward, outward]) => (
              <div className="chart-column" key={month}>
                <div className="chart-bar-group">
                  <span
                    className="chart-bar inward"
                    style={{ height: `${inward}px` }}
                  />
                  <span
                    className="chart-bar outward"
                    style={{ height: `${outward}px` }}
                  />
                </div>

                <span className="chart-month">{month}</span>
              </div>
            ))}
          </div>

          <div className="chart-y-axis">
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
        </div>
      </div>


      {/* Inventory Status */}
      <div className="inventory-status-card">

        <div className="inventory-status-header">
          <h3>Inventory Status</h3>

          <button>
            View Details →
          </button>
        </div>

        <div className="inventory-status-content">

          <div className="inventory-donut">
            <div className="inventory-donut-inner">
              <strong>1,248</strong>
              <span>Products</span>
            </div>
          </div>

          <div className="inventory-legend">

            <div>
              <span className="legend-dot in-stock" />
              <span>In Stock</span>
              <strong>68%</strong>
            </div>

            <div>
              <span className="legend-dot low-stock" />
              <span>Low Stock</span>
              <strong>18%</strong>
            </div>

            <div>
              <span className="legend-dot out-stock" />
              <span>Out of Stock</span>
              <strong>6%</strong>
            </div>

            <div>
              <span className="legend-dot discontinued" />
              <span>Discontinued</span>
              <strong>8%</strong>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default StockCharts;