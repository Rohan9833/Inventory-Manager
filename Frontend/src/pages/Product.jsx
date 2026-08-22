import { useEffect, useState } from "react";

import ProductForm from "../components/ProductForm.product";
import ProductTable from "../components/ProductTable.product";
// import "../css/product.css"

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  restoreProduct,
} from "../api/product.api";

import { getCategories } from "../api/category.api";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

  // ===========================
  // Fetch Products
  // ===========================

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Fetch Categories
  // ===========================

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      const activeCategories = response.data.filter(
        (category) => category.isActive
      );

      setCategories(activeCategories);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Create
  // ===========================

  const handleCreate = async (data) => {
    try {
      const response = await createProduct(data);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Update
  // ===========================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateProduct(id, data);

      alert(response.message);

      setEditingProduct(null);

      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Delete
  // ===========================

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Restore
  // ===========================

  const handleRestore = async (id) => {
    try {
      const response = await restoreProduct(id);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Initial Load
  // ===========================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="product-page">
      <h1>Product Management</h1>

      <ProductForm
        categories={categories}
        editingProduct={editingProduct}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <ProductTable
        products={products}
        loading={loading}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default Product;