import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CategoryForm from "../components/Category/CategoryForm.category";
import CategoryTable from "../components/Category/CategoryTable.category";
import HomeHeader from "../components/Home/HomeHeader";

import {
  createCategory,
  getCategories,
  updateCategory,
  changeCategoryStatus,
} from "../api/category.api";

import "../css/Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ===============================
  // Fetch Categories
  // ===============================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      setCategories(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load categories"
      );
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

      toast.success(
        response.message || "Category created successfully"
      );

      setShowForm(false);
      setEditingCategory(null);

      await fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===============================
  // Update
  // ===============================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateCategory(id, data);

      toast.success(
        response.message || "Category updated successfully"
      );

      setEditingCategory(null);
      setShowForm(false);

      await fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===============================
  // Status Change
  // ===============================

  const handleStatus = async (id, status) => {
    try {
      const response = await changeCategoryStatus(id, status);

      toast.success(
        response.message || "Category status updated"
      );

      await fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===============================
  // Add Category
  // ===============================

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  // ===============================
  // Edit Category
  // ===============================

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  // ===============================
  // Close Form
  // ===============================

  const handleCloseForm = () => {
    setEditingCategory(null);
    setShowForm(false);
  };

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.isActive
  ).length;

  const inactiveCategories = categories.filter(
    (category) => !category.isActive
  ).length;

  const totalProducts = categories.reduce(
    (total, category) => {
      if (typeof category.productCount === "number") {
        return total + category.productCount;
      }

      if (typeof category.productsCount === "number") {
        return total + category.productsCount;
      }

      if (Array.isArray(category.products)) {
        return total + category.products.length;
      }

      return total;
    },
    0
  );

  return (
    <div className="category-page">
      <HomeHeader />

      <main className="category-main">

        {/* ===============================
            PAGE HEADER
        =============================== */}

        <div className="category-page-header">
          <div>
            <span className="category-eyebrow">
              CATEGORIES
            </span>

            <h1>Product Categories</h1>

            <p>
              Manage and organize your product categories for
              better inventory control.
            </p>
          </div>

          <div className="category-header-tip">
            <div className="category-tip-icon">
              <span>◇</span>
            </div>

            <div>
              <strong>
                Well organized categories
              </strong>

              <span>
                lead to a smoother business.
              </span>

              <i></i>
            </div>
          </div>

          {/* Mobile Add Button */}
          <button
            className="category-mobile-header-add"
            onClick={handleAddCategory}
          >
            <span>+</span>
            Add Category
          </button>
        </div>

        {/* ===============================
            STATS
        =============================== */}

        <div className="category-stats">

          <div className="category-stat-card">
            <div className="category-stat-icon folder-icon">
              <span>▱</span>
            </div>

            <div>
              <strong>{totalCategories}</strong>
              <span>Total Categories</span>
            </div>
          </div>

          <div className="category-stat-card">
            <div className="category-stat-icon box-icon">
              <span>◆</span>
            </div>

            <div>
              <strong>
                {totalProducts.toLocaleString()}
              </strong>

              <span>Total Products</span>
            </div>
          </div>

          <div className="category-stat-card category-inactive-stat">
            <div className="category-stat-icon chart-icon">
              <span>▥</span>
            </div>

            <div>
              <strong>{inactiveCategories}</strong>
              <span>Inactive Categories</span>
            </div>
          </div>

          <button
            className="category-add-button"
            onClick={handleAddCategory}
          >
            <span>+</span>
            Add New Category
          </button>
        </div>

        {/* ===============================
            CONTENT
        =============================== */}

        <div className="category-content">
          <CategoryTable
            categories={categories}
            loading={loading}
            onEdit={handleEdit}
            onStatus={handleStatus}
          />

          {showForm && (
            <div className="category-form-panel">
              <CategoryForm
                editingCategory={editingCategory}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onClose={handleCloseForm}
                activeCategories={activeCategories}
              />
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default Category;