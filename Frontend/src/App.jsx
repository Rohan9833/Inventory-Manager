import AppRoutes from "./routes/AppRoutes";
import BottomNavigation from "./components/BottomNavigation";
import Sidebar from "./components/Home/Sidebar.home";
import Topbar from "./components/Home/HomeHeader"
import "./App.css"; // We'll create this new CSS file

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      {/* <Topbar/> */}

      <div className="app-main-content">
        <AppRoutes />
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;