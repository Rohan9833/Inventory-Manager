import { useEffect, useState } from "react";

import SaleForm from "../components/SaleForm.sale";
import SaleTable from "../components/SaleTable.sale";

import {
  createSale,
  getSales,
} from "../api/sale.api";

import { getCustomers } from "../api/customer.api";
import { getProducts } from "../api/product.api";

function Sale() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================
  // Customers
  // ===========================

  const fetchCustomers = async () => {
    try {

      const response = await getCustomers();

      const customerList =
        response.customers ||
        response.data?.customers ||
        response.data ||
        [];

      setCustomers(
        Array.isArray(customerList)
          ? customerList.filter(c => c.status)
          : []
      );

    } catch (error) {

      console.log(error);

      setCustomers([]);

    }
  };

  // ===========================
  // Products
  // ===========================

  const fetchProducts = async () => {
    try {

      const response = await getProducts();

      const productList =
        response.products ||
        response.data?.products ||
        response.data ||
        [];

      setProducts(
        Array.isArray(productList)
          ? productList.filter(p => !p.isDeleted)
          : []
      );

    } catch (error) {

      console.log(error);

      setProducts([]);

    }
  };

  // ===========================
  // Sales
  // ===========================

  const fetchSales = async () => {
    try {

      const response = await getSales();

      const saleList =
        response.sales ||
        response.data?.sales ||
        response.data ||
        [];

      setSales(
        Array.isArray(saleList)
          ? saleList
          : []
      );

    } catch (error) {

      console.log(error);

      setSales([]);

    }
  };

  // ===========================
  // Create Sale
  // ===========================

  const handleCreate = async (data) => {

    try {

      const response = await createSale(data);

      alert(response.message);

      await Promise.all([
        fetchSales(),
        fetchProducts(),
        fetchCustomers(),
      ]);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      await Promise.all([
        fetchCustomers(),
        fetchProducts(),
        fetchSales(),
      ]);

      setLoading(false);

    };

    loadData();

  }, []);

  return (
    <div>

      <h1>Sale Management</h1>

      <SaleForm
        customers={customers}
        products={products}
        onCreate={handleCreate}
      />

      {/* <SaleTable
        sales={sales}
        loading={loading}
      /> */}

    </div>
  );
}

export default Sale;