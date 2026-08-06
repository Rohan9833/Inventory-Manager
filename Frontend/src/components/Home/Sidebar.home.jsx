import { useState } from "react";
import "../../css/Sidebar.home.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="home-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Header */}
      <header className="home-header">
        <div className="home-header-left">
          <button className="home-menu-btn" onClick={() => setIsOpen(true)}>
            ☰
          </button>

          <div className="home-header-content">
            <h2>Good Morning, Rohan 👋</h2>
            <p>Here's what's happening with your inventory today.</p>
          </div>
        </div>

        {/* <div className="home-header-right">
          <button className="home-notification-btn">🔔</button>

          <div className="home-profile-avatar">R</div>
        </div> */}
      </header>

      {/* Sidebar */}
      <aside className={`home-sidebar ${isOpen ? "home-sidebar-open" : ""}`}>
        <div className="home-sidebar-logo">
          <h2>INVENTORY</h2>
          <p>MANAGEMENT</p>
        </div>

        <nav className="home-sidebar-nav">
          <ul className="home-sidebar-list">
            <li className="home-sidebar-item home-sidebar-item-active">
              Dashboard
            </li>

            <li className="home-sidebar-item">Categories</li>

            <li className="home-sidebar-item">Products</li>

            <li className="home-sidebar-item">Inventory</li>

            <li className="home-sidebar-item">Customers</li>

            <li className="home-sidebar-item">Sales</li>

            <li className="home-sidebar-item">Payments</li>

            <li className="home-sidebar-item">Reports</li>
          </ul>
        </nav>

        <div className="home-sidebar-footer">
          <div className="home-sidebar-user">
            <div className="home-sidebar-avatar">R</div>

            <div className="home-sidebar-user-info">
              <h4>Rohan Pal</h4>
              <p>Administrator</p>
            </div>
          </div>
        </div>

        <button className="home-sidebar-close" onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
