import AppRoutes from "./routes/AppRoutes";
import { Routes, Route, useLocation } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import Sidebar from "./components/Home/Sidebar.home";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  // ==============================
  // LOGIN PAGE
  // ==============================
  if (isLoginPage) {
    return (
      <div className="login-app-container">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    );
  }

  // ==============================
  // MAIN APPLICATION
  // ==============================
  return (
    <div className="app-container">
      <Sidebar />

      <div className="app-main-content">
        <AppRoutes />
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;