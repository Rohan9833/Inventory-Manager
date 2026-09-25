import { useEffect, useState } from "react";

import ProductForm from "../components/Product/ProductForm.product";
import HomeHeader from "../components/Home/HomeHeader";
import ProductTable from "../components/Product/ProductTable.product";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  restoreProduct,
} from "../api/product.api";

import { getCategories } from "../api/category.api";

import "../css/Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  // =========================================================
  // FETCH PRODUCTS
  // =========================================================

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // FETCH CATEGORIES
  // =========================================================

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      const activeCategories = (response.data || []).filter(
        (category) => category.isActive
      );

      setCategories(activeCategories);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // CREATE
  // =========================================================

  const handleCreate = async (data) => {
    try {
      const response = await createProduct(data);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================================================
  // UPDATE
  // =========================================================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateProduct(id, data);

      alert(response.message);

      setEditingProduct(null);

      await fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================================================
  // RESTORE
  // =========================================================

  const handleRestore = async (id) => {
    try {
      const response = await restoreProduct(id);

      alert(response.message);

      await fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

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
    <div className="inv-product-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <HomeHeader />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="inv-product-hero">

        <img
          className="inv-product-hero-image"
          src="https://coast-wp.imgix.net/2026/05/inventory-control.jpg?auto=format&fit=crop&w=1800&q=85"
          alt="Warehouse inventory management"
        />

        <div className="inv-product-hero-overlay"></div>

        <div className="inv-product-hero-content">

          <span className="inv-product-hero-label">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            Manage Your Products
            <br />
            Smarter
          </h1>

          <p>
            Add, update and organize your inventory
            with ease.
          </p>

          <div className="inv-product-hero-features">

            <div className="inv-product-hero-feature">
              <span>📦</span>
              <strong>Track Stock</strong>
            </div>

            <div className="inv-product-hero-feature">
              <span>📊</span>
              <strong>Better Control</strong>
            </div>

            <div className="inv-product-hero-feature">
              <span>📈</span>
              <strong>Grow Your Business</strong>
            </div>

          </div>

        </div>

        <div className="inv-product-hero-note">
          Right Product
          <br />
          Right Stock
          <br />
          Better Business
        </div>

      </section>


      {/* =====================================================
          MAIN PRODUCT AREA
      ===================================================== */}

      <main className="inv-product-main">

        <div className="inv-product-layout">

          {/* =================================================
              LEFT - PRODUCT TABLE
          ================================================= */}

          <section className="inv-product-table-area">

            <ProductTable
              products={products}
              loading={loading}
              onEdit={setEditingProduct}
              onDelete={handleDelete}
              onRestore={handleRestore}
              onRefresh={fetchProducts}
            />

          </section>


          {/* =================================================
              RIGHT - PRODUCT FORM
          ================================================= */}

          <aside className="inv-product-form-area">

            <ProductForm
              categories={categories}
              editingProduct={editingProduct}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
            />

          </aside>

        </div>

      </main>


      {/* =====================================================
          BOTTOM DECORATIVE SECTION
          - no green shape
          - image is now a background (fading left)
      ===================================================== */}

      <section className="inv-product-bottom">

        <div className="inv-product-bottom-inner">

          {/* MESSAGE */}

          <div className="inv-product-bottom-text">

            <span className="inv-product-bottom-quote">
              “
            </span>

            <h2>
              Well Managed Products
              <br />
              Build a Stronger Tomorrow
            </h2>

            <span className="inv-product-bottom-line"></span>

          </div>


          {/* FEATURES */}

          <div className="inv-product-bottom-features">

            <div className="inv-product-bottom-feature">
              <span>📦</span>
              <strong>Organize</strong>
            </div>

            <div className="inv-product-bottom-feature">
              <span>⚙️</span>
              <strong>Optimize</strong>
            </div>

            <div className="inv-product-bottom-feature">
              <span>📈</span>
              <strong>Progress</strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Product;