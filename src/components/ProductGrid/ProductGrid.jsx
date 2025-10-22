// FILE: src/ProductGrid/ProductGrid.jsx
import { useState, useEffect, useMemo } from "react";

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

  // ---- Sync external products ----
  useEffect(() => {
    setProductList(products);
  }, [products]);

  // ---- Listen for modal open event ----
  useEffect(() => {
    const handleOpenModal = (e) => {
      setSelectedProduct(e.detail);
      setShowModal(true);
    };
    window.addEventListener("open-product-modal", handleOpenModal);
    return () => window.removeEventListener("open-product-modal", handleOpenModal);
  }, []);

  // ---- Patch product after modal save ----
  const handleProductRefresh = (updatedProduct) => {
    if (!updatedProduct?.product_id) return;
    updatedProduct._photosUpdatedAt = Date.now();

    setProductList((prev) =>
      prev.map((p) =>
        p.product_id === updatedProduct.product_id ? updatedProduct : p
      )
    );
    setSelectedProduct(updatedProduct);
  };

  // ---- Compute consistent card height ----
  const cardHeight = useMemo(() => {
    const imageHeight = Math.round(cardWidth * 0.65);
    return imageHeight + 68; // same formula as ProductGridCard
  }, [cardWidth]);

  // ---- Wrapper layout ----
  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
    gap: `${gap}px`,
    width: "100%",
    boxSizing: "border-box",
    justifyItems: "center",
    alignItems: "start",
    minHeight: `${cardHeight + 30}px`, // Prevents grid shrink when only Add card
    paddingBottom: "10px",
    transition: "all 0.3s ease",
  };

  // ---- Cards ----
  const items = useMemo(() => {
    const addCard = showAddCard ? (
      <AddProductCard key="add-card" onClick={onAddClick} cardWidth={cardWidth} />
    ) : null;

    const productCards = productList.map((p) => (
      <ProductGridCard
        key={`${p.product_id}-${p._photosUpdatedAt || 0}`}
        product={p}
        cardWidth={cardWidth}
      />
    ));

    return showAddCard ? [addCard, ...productCards] : productCards;
  }, [showAddCard, productList, onAddClick, cardWidth]);

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
