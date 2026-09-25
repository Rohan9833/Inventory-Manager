import { House, Box, Plus, ShoppingCart, Grid2x2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/BottomNavigation.css";

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="home-bottom-nav">
        <button
          className={`home-nav-item ${
            location.pathname === "/home" ? "home-nav-active" : ""
          }`}
          onClick={() => navigate("/home")}
        >
          <House size={24} />
          <span>Home</span>
        </button>

        <button
          className={`home-nav-item ${
            location.pathname === "/category" ? "home-nav-active" : ""
          }`}
          onClick={() => navigate("/category")}
        >
          <Box size={24} />
          <span>Categories</span>
        </button>

        <button
          // className="home-nav-center"
          className={`home-nav-center home-nav-item ${
            location.pathname === "/product" ? "home-nav-active" : ""
          }`}
          onClick={() => navigate("/product")}
        >
          <Plus size={34} />
        </button>

        <button
          className={`home-nav-item ${
            location.pathname === "/sale" ? "home-nav-active" : ""
          }`}
          onClick={() => navigate("/sale")}
        >
          <ShoppingCart size={24} />
          <span>Sales</span>
        </button>

        <button
          className={`home-nav-item ${
            location.pathname === "/inventory" ? "home-nav-active" : ""
          }`}
          onClick={() => navigate("/inventory")}
        >
          <Grid2x2 size={24} />
          <span>inventory</span>
        </button>
      </nav>
    </>
  );
}

export default BottomNavigation;
