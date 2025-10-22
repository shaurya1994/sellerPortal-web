// FILE: src/ProductGrid/ProductGrid.jsx
import { useState, useEffect } from "react";
import AddProductCard from "./AddProductCard";
import ProductGridCard from "./ProductGridCard";
import ProductInfoModal from "../ProductInfoModal/ProductInfoModal";

const ProductGrid = ({
  products = [],
  showAddCard = true,
  onAddClick,
  cardWidth = 320,
  gap = 24,
}) => {
  const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sync external products
  useEffect(() => {
    setProductList(products);
  }, [products]);

  // Listen for modal open event
  useEffect(() => {
    const handleOpenModal = (e) => {
      setSelectedProduct(e.detail);
      setShowModal(true);
    };
    window.addEventListener("open-product-modal", handleOpenModal);
    return () => window.removeEventListener("open-product-modal", handleOpenModal);
  }, []);

  // ✅ Callback from modal — patch specific product
  const handleProductRefresh = (updatedProduct) => {
    if (!updatedProduct?.product_id) return;
    updatedProduct._photosUpdatedAt = Date.now(); // <– trigger card remount

    setProductList((prev) =>
      prev.map((p) =>
        p.product_id === updatedProduct.product_id ? updatedProduct : p
      )
    );
    setSelectedProduct(updatedProduct);
  };

  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
    gap: `${gap}px`,
    width: "100%",
    boxSizing: "border-box",
  };

  // ✅ Build product cards (include timestamp in key to force remount)
  const items = showAddCard
    ? [<AddProductCard key="add-card" onClick={onAddClick} />].concat(
        productList.map((p) => (
          <ProductGridCard
            key={`${p.product_id}-${p._photosUpdatedAt || 0}`}
            product={p}
            cardWidth={cardWidth}
          />
        ))
      )
    : productList.map((p) => (
        <ProductGridCard
          key={`${p.product_id}-${p._photosUpdatedAt || 0}`}
          product={p}
          cardWidth={cardWidth}
        />
      ));

  return (
    <>
      <div style={wrapperStyle}>{items}</div>

      <ProductInfoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onProductRefresh={handleProductRefresh}
      />
    </>
  );
};

export default ProductGrid;
