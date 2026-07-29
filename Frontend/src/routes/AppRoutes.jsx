import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import ProctedRoute from "../routes/ProtectedRoute";
import Product from "../pages/Product";
import Inventory from "../pages/Inventory";
import Customer from "../pages/Customer";
import Sale from "../pages/Sale";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProctedRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/sale" element={<Sale />} />





      </Route>
    </Routes>
  );
}

export default AppRoutes;
