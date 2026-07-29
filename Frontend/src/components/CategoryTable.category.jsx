function CategoryTable({ categories, loading, onEdit, onStatus }) {
  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return <h3>Loading Categories...</h3>;
  }

  // ===========================
  // Empty State
  // ===========================

  if (categories.length === 0) {
    return <h3>No Categories Found</h3>;
  }

  return (
    <div>
      <h2>Category List</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>

              <td>{category.name}</td>

              <td>{category.description || "-"}</td>

              <td>
                {category.isActive ? (
                  <span>🟢 Active</span>
                ) : (
                  <span>🔴 Inactive</span>
                )}
              </td>

              <td>{new Date(category.createdAt).toLocaleDateString()}</td>

              <td>
                <button onClick={() => onEdit(category)}>Edit</button>{" "}
                <button
                  onClick={() => onStatus(category._id, !category.isActive)}
                >
                  {category.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
