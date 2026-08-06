import {
  House,
  Box,
  Plus,
  ShoppingCart,
  Grid2x2,
} from "lucide-react";
import "../css/BottomNavigation.css"

function BottomNavigation() {
  return (
    <nav className="home-bottom-nav">

      <button className="home-nav-item home-nav-active">
        <House size={24} />
        <span>Home</span>
      </button>

      <button className="home-nav-item">
        <Box size={24} />
        <span>Products</span>
      </button>

      <button className="home-nav-center">
        <Plus size={34} />
      </button>

      <button className="home-nav-item">
        <ShoppingCart size={24} />
        <span>Sales</span>
      </button>

      <button className="home-nav-item">
        <Grid2x2 size={24} />
        <span>More</span>
      </button>

    </nav>
  );
}

export default BottomNavigation;