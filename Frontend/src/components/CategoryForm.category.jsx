import { useEffect, useState } from "react";

function CategoryForm({
  editingCategory,
  onCreate,
  onUpdate,
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
    <form onSubmit={handleSubmit}>

      <h2>
        {editingCategory ? "Update Category" : "Create Category"}
      </h2>

      <div>
        <label>Category Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows={4}
        />
      </div>

      <button type="submit">
        {editingCategory ? "Update Category" : "Create Category"}
      </button>

    </form>
  );
}

export default CategoryForm;