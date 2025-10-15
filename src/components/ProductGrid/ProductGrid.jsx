// FILE: ProductGrid.jsx
import AddProductCard from "./AddProductCard";
import ProductGridCard from "./ProductGridCard";

const ProductGrid = ({
  products = [],
  showAddCard = true,
  onAddClick,
  cardWidth = 320,
  gap = 24,
}) => {
  const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
    gap: `${gap}px`,
    width: "100%",
    boxSizing: "border-box",
  };

  // build list of cards to render
  const items = showAddCard
    ? [<AddProductCard key="add-card" onClick={onAddClick} />].concat(
        products.map((p) => (
          <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
        ))
      )
    : products.map((p) => (
        <ProductGridCard key={p.product_id} product={p} cardWidth={cardWidth} />
      ));

  return <div style={wrapperStyle}>{items}</div>;
};

export default ProductGrid;
