import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import ProctedRoute from "../routes/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProctedRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />

      </Route>
    </Routes>
  );
}

export default AppRoutes;
