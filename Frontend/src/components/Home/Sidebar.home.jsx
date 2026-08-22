import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/Sidebar.home.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Categories",
      path: "/category",
    },
    {
      name: "Products",
      path: "/product",
    },
    {
      name: "Inventory",
      path: "/inventory",
    },
    {
      name: "Customers",
      path: "/customer",
    },
    {
      name: "Sales",
      path: "/sale",
    },
    {
      name: "Payments",
      path: "/payment",
    },
    {
      name: "Reports",
      path: "/reports",
    },
  ];

  return (
    <>
      {/* ================= OVERLAY ================= */}

      {isOpen && (
        <div
          className="home-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= HEADER ================= */}

      <header className="home-header">
        <div className="home-header-left">
          <button
            className="home-menu-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="home-header-content">
            <h2>Good Morning, Rohan 👋</h2>

            <p>
              Here's what's happening with your inventory today.
            </p>
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`home-sidebar ${
          isOpen ? "home-sidebar-open" : ""
        }`}
      >
        {/* Logo */}

        <div className="home-sidebar-logo">
          <h2>INVENTORY</h2>

          <p>MANAGEMENT</p>
        </div>

        {/* Navigation */}

        <nav className="home-sidebar-nav">
          <ul className="home-sidebar-list">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className="home-sidebar-item"
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `home-sidebar-link ${
                      isActive
                        ? "home-sidebar-link-active"
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User */}

        <div className="home-sidebar-footer">
          <div className="home-sidebar-user">
            <div className="home-sidebar-avatar">
              R
            </div>

            <div className="home-sidebar-user-info">
              <h4>Rohan Pal</h4>

              <p>Administrator</p>
            </div>
          </div>
        </div>

        {/* Close */}

        <button
          className="home-sidebar-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
      </aside>
    </>
  );
}

export default Sidebar;