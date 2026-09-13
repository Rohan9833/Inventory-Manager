import { useEffect, useState } from "react";
import "../../css/CategoryForm.css";

function CategoryForm({
  editingCategory,
  onCreate,
  onUpdate,
  onClose,
}) {
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
        name: editingCategory.name || "",
        description: editingCategory.description || "",
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
      alert("Category name is required");
      return;
    }

    if (editingCategory) {
      await onUpdate(editingCategory._id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
    } else {
      await onCreate({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
    }

    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      {/* ===============================
          HEADER
      =============================== */}

      <div className="category-form-header">
        <div>
          <h2>
            {editingCategory
              ? "Edit Category"
              : "Add New Category"}
          </h2>

          <p>
            {editingCategory
              ? "Update category information"
              : "Create a new product category"}
          </p>
        </div>

        <button
          type="button"
          className="category-form-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* ===============================
          FORM BODY
      =============================== */}

      <div className="category-form-body">
        {/* Name */}

        <div className="category-form-field">
          <label htmlFor="category-name">
            Category Name <span>*</span>
          </label>

          <input
            id="category-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>

        {/* Description */}

        <div className="category-form-field">
          <label htmlFor="category-description">
            Description
          </label>

          <textarea
            id="category-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description (optional)"
            rows={4}
          />
        </div>

        {/* Status */}

        <div className="category-form-field">
          <label>Status</label>

          <div className="category-select-box">
            <span
              className={
                editingCategory?.isActive === false
                  ? "status-dot inactive"
                  : "status-dot"
              }
            ></span>

            <span>
              {editingCategory?.isActive === false
                ? "Inactive"
                : "Active"}
            </span>

            <span className="select-arrow">⌄</span>
          </div>

          <small>
            Use the table action to activate or deactivate a
            category.
          </small>
        </div>

        {/* Parent Category */}

        <div className="category-form-field">
          <label>Parent Category <em>(Optional)</em></label>

          <div className="category-select-box category-select-disabled">
            <span>Select parent category</span>
            <span className="select-arrow">⌄</span>
          </div>

          <small>
            Parent categories can be added when hierarchy support
            is enabled.
          </small>
        </div>
      </div>

      {/* ===============================
          ACTIONS
      =============================== */}

      <div className="category-form-footer">
        <button
          type="submit"
          className="category-form-submit"
        >
          <span>+</span>

          {editingCategory
            ? "Update Category"
            : "Create Category"}
        </button>

        <button
          type="button"
          className="category-form-cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      {/* ===============================
          TIP
      =============================== */}

      <div className="category-form-tip">
        <div>i</div>

        <p>
          <strong>Tip</strong>
          Use clear and simple names to keep your inventory well
          organized.
        </p>
      </div>
    </form>
  );
}

export default CategoryForm;