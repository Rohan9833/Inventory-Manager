import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CategoryForm from "../components/CategoryForm.category";
import CategoryTable from "../components/CategoryTable.category";

import {
  createCategory,
  getCategories,
  updateCategory,
  changeCategoryStatus,
} from "../api/category.api";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCategory, setEditingCategory] = useState(null);

  // ===============================
  // Fetch Categories
  // ===============================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Create
  // ===============================

  const handleCreate = async (data) => {
    try {
      const response = await createCategory(data);

      toast.success(response.message);

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===============================
  // Update
  // ===============================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateCategory(id, data);

      toast.success(response.message);

      setEditingCategory(null);

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===============================
  // Status Change
  // ===============================

  const handleStatus = async (id, status) => {
    try {
      const response = await changeCategoryStatus(id, status);

      toast.success(response.message);

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Category Management</h1>

      <CategoryForm
        editingCategory={editingCategory}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={setEditingCategory}
        onStatus={handleStatus}
      />
    </div>
  );
}

export default Category;
