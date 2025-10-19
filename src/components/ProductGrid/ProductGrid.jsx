// FILE: ProductGrid.jsx
// import { useState, useEffect } from "react";

// import AddProductCard from "./AddProductCard";
// import ProductGridCard from "./ProductGridCard";
// import ProductInfoModal from "../ProductInfoModal/ProductInfoModal"; 
// import ProductAddModal from "../ProductAddModal/ProductAddModal"; 

// const ProductGrid = ({
//   products = [],
//   showAddCard = true,
//   onAddClick,
//   cardWidth = 320,
//   gap = 24,
// }) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const handleAddClick = () => setShowAddModal(true);


//   useEffect(() => {
//     // ✅ Listen to "open-product-modal" custom event fired by ProductGridCard
//     const handleOpenModal = (e) => {
//       setSelectedProduct(e.detail);
//       setShowModal(true);
//     };

//     window.addEventListener("open-product-modal", handleOpenModal);

//     return () => {
//       window.removeEventListener("open-product-modal", handleOpenModal);
//     };
//   }, []);

//   const wrapperStyle = {
//     display: "grid",
//     gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
//     gap: `${gap}px`,
//     width: "100%",
//     boxSizing: "border-box",
//   };

//   // ✅ Build list of cards to render
//   const items = showAddCard
//     ? [<AddProductCard key="add-card" onClick={onAddClick} />].concat(
//         products.map((p) => (
//           <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
//         ))
//       )
//     : products.map((p) => (
//         <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
//       ));

//   return (
//     <>
//       <div style={wrapperStyle}>{items}</div>

//       {/* Shared modal for all products */}
//       <ProductInfoModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         product={selectedProduct}
//       />

//       {/* Add product modal */}
//       <ProductAddModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={(newProduct) => {
//           // e.g. refresh list or add to local state
//           setShowAddModal(false);
//         }}
//       />

//     </>
//   );
// };

// export default ProductGrid;

// FILE: ProductGrid.jsx
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // ✅ Listen to "open-product-modal" custom event fired by ProductGridCard
    const handleOpenModal = (e) => {
      setSelectedProduct(e.detail);
      setShowModal(true);
    };

    window.addEventListener("open-product-modal", handleOpenModal);

    return () => {
      window.removeEventListener("open-product-modal", handleOpenModal);
    };
  }, []);

  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
    gap: `${gap}px`,
    width: "100%",
    boxSizing: "border-box",
  };

  // ✅ Build list of cards to render
  const items = showAddCard
    ? [<AddProductCard key="add-card" onClick={onAddClick} />].concat(
        products.map((p) => (
          <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
        ))
      )
    : products.map((p) => (
        <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
      ));

  return (
    <>
      <div style={wrapperStyle}>{items}</div>

      {/* ✅ Shared modal for all products */}
      <ProductInfoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductGrid;
