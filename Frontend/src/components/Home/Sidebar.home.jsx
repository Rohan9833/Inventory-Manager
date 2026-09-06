import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/Sidebar.home.css";

// Simple inline SVG icons
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  Categories: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),

  Products: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" strokeLinejoin="round" />
      <path d="M3 8l9 5 9-5M12 13v8" strokeLinejoin="round" />
    </svg>
  ),

  Inventory: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M9 3h6v4H9zM8 11h8M8 15h5" strokeLinecap="round" />
    </svg>
  ),

  Customers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" strokeLinecap="round" />
      <circle cx="17.5" cy="8.5" r="2.4" />
      <path d="M14.8 14.8c2.6.2 4.7 2.2 4.7 5.2" strokeLinecap="round" />
    </svg>
  ),

  Sales: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path
        d="M2.5 3h2.4l2 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6l1.4-7.7H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Payments: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.5h19" strokeLinecap="round" />
      <path d="M6 14.5h4" strokeLinecap="round" />
    </svg>
  ),

  Reports: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M12 20V4M20 20v-6" strokeLinecap="round" />
    </svg>
  ),
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/home", icon: Icons.Dashboard },
    { name: "Categories", path: "/category", icon: Icons.Categories },
    { name: "Products", path: "/product", icon: Icons.Products },
    { name: "Inventory", path: "/inventory", icon: Icons.Inventory },
    { name: "Customers", path: "/customer", icon: Icons.Customers },
    { name: "Sales", path: "/sale", icon: Icons.Sales },
    { name: "Payments", path: "/payment", icon: Icons.Payments },
    { name: "Reports", path: "/reports", icon: Icons.Reports },
  ];

  return (
    <>
      {/* Overlay - mobile only */}
      {isOpen && (
        <div
          className="home-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`home-sidebar ${isOpen ? "home-sidebar-open" : ""}`}>
        {/* Close - mobile/tablet only */}
        <button
          className="home-sidebar-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="home-sidebar-logo">
          <div className="home-sidebar-logo-icon">📦</div>
          <div>
            <h2>Inventro</h2>
            <p>Inventory Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="home-sidebar-nav">
          <ul className="home-sidebar-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="home-sidebar-item">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `home-sidebar-link ${
                        isActive ? "home-sidebar-link-active" : ""
                      }`
                    }
                  >
                    <span className="home-sidebar-link-icon">
                      <Icon />
                    </span>
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA */}
        <div className="home-sidebar-cta">
          <div className="home-sidebar-cta-icon">🌱</div>
          <h3>Organize Today</h3>
          <h3>Scale Tomorrow</h3>
          <p>Smart Inventory for a Smarter Business.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;