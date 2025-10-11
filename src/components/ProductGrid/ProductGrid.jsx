import AddProductCard from "./AddProductCard";
import ProductGridCard from "./ProductGridCard";
import { gridStyles } from "./ProductGrid.styles";

const ProductGrid = ({ products = [], showAddCard = true, onAddClick }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-5">
        <p className="text-muted fs-5">No products to show</p>
      </div>
    );
  }

  return (
    <div style={gridStyles.gridWrapper}>
      {showAddCard && (
        <div style={{ flex: "1 1 22%", minWidth: "260px" }}>
          <AddProductCard onClick={onAddClick} />
        </div>
      )}
      {products.map((p) => (
        <div key={p.product_id} style={{ flex: "1 1 22%", minWidth: "260px" }}>
          <ProductGridCard product={p} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

// import AddProductCard from "./AddProductCard";
// import ProductGridCard from "./ProductGridCard";
// import { productGridStyles as s } from "./ProductGrid.styles";

// const ProductGrid = ({ products = [], showAddCard = true, onAddClick }) => (
//   <div style={s.gridContainer}>
//     {showAddCard && (
//       <div style={s.cardWrapper}>
//         <AddProductCard onClick={onAddClick} />
//       </div>
//     )}

//     {products.length > 0 ? (
//       products.map((product) => (
//         <div key={product.product_id} style={s.cardWrapper}>
//           <ProductGridCard product={product} />
//         </div>
//       ))
//     ) : (
//       <div style={s.noProducts}>
//         <p className="fs-5">No products to show</p>
//       </div>
//     )}
//   </div>
// );

// export default ProductGrid;
