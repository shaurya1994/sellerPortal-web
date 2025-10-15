// FILE: ProductGrid.jsx
import AddProductCard from "./AddProductCard";
import ProductGridCard from "./ProductGridCard";
import { gridStyles } from "./ProductGrid.styles";

const ProductGrid = ({ products = [], showAddCard = true, onAddClick, cardWidth = 320, gap = 24 }) => {
  // wrapper style uses flex and each child has fixed width to avoid stretching
  const wrapperStyle = {
    ...gridStyles.gridWrapper,
    gap: `${gap}px`,
    justifyContent: "center", // ✅ centers grid, fixes right empty space
  };

  const itemStyle = {
    flex: `0 0 ${cardWidth}px`,
    width: `${cardWidth}px`,
    maxWidth: `${cardWidth}px`,
    minWidth: `${cardWidth}px`,
    display: "flex",
  };

  if (!products || products.length === 0) {
    // still show AddProductCard when no products and showAddCard true
    return (
      <div style={wrapperStyle}>
        {showAddCard && (
          <div style={itemStyle}>
            <AddProductCard onClick={onAddClick} />
          </div>
        )}
        <div style={{ width: "100%" }} />
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      {showAddCard && (
        <div style={itemStyle}>
          <AddProductCard onClick={onAddClick} />
        </div>
      )}
      {products.map((p) => (
        <div key={p.product_id} style={itemStyle}>
          <ProductGridCard product={p} cardWidth={cardWidth} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
