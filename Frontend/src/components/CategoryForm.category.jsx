import { useEffect, useState } from "react";
import "../css/CategoryForm.css"

function CategoryForm({ editingCategory, onCreate, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // ===========================
  // Edit Mode
  // ===========================

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description,
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [editingCategory]);

  // ===========================
  // Handle Change
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // Submit
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Category name is required");
    }

    if (editingCategory) {
      await onUpdate(editingCategory._id, formData);
    } else {
      await onCreate(formData);
    }

    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="category-form-header">
        <h2 className="category-form-title">
          {editingCategory ? "Update Category" : "Create Category"}
        </h2>

        <p className="category-form-subtitle">
          {editingCategory
            ? "Update the category information"
            : "Add a new category to your inventory"}
        </p>
      </div>

      <div className="category-form-body">
        {/* Category Name */}

        <div className="category-form-field">
          <label className="category-form-label" htmlFor="category-name">
            Category Name
            <span className="category-form-required">*</span>
          </label>

          <input
            id="category-name"
            className="category-form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>

        {/* Description */}

        <div className="category-form-field">
          <label className="category-form-label" htmlFor="category-description">
            Description
          </label>

          <textarea
            id="category-description"
            className="category-form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
          />
        </div>
      </div>

      <div className="category-form-footer">
        <button type="submit" className="category-form-submit">
          {editingCategory ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
