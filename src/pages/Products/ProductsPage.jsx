import { useEffect, useState } from "react";
import { productsPageStyles } from "./ProductsPage.styles";
import { fetchSellerProducts } from "../../api/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const ProductsPage = () => {
  const [active, setActive] = useState("my-products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const status = active === "my-products" ? "approved" : "pending";
    const loadProducts = async () => {
      try {
        const data = await fetchSellerProducts(status);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [active]);

  return (
    <div className="container-fluid py-3 px-4">
      {/* Tabs */}
      <div style={productsPageStyles.tabWrapper}>
        <div className="d-flex justify-content-start">
          <ul className="nav" style={productsPageStyles.navList}>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...productsPageStyles.tabLink,
                  ...(active === "my-products"
                    ? productsPageStyles.tabActive
                    : {}),
                }}
                onClick={() => setActive("my-products")}
              >
                My Products
              </button>
            </li>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...productsPageStyles.tabLink,
                  ...(active === "pending"
                    ? productsPageStyles.tabActive
                    : {}),
                }}
                onClick={() => setActive("pending")}
              >
                Pending Approval
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-4">
        <ProductGrid
          products={products}
          showAddCard={active === "my-products"}
          onAddClick={() => console.log("🟢 Add Product clicked")}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
