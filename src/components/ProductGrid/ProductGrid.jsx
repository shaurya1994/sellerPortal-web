import AddProductCard from "./AddProductCard";
import ProductGridCard from "./ProductGridCard";
import { productGridStyles as s } from "./ProductGrid.styles";

const ProductGrid = ({ products = [], showAddCard = true, onAddClick }) => (
  <div style={s.gridContainer}>
    {showAddCard && (
      <div style={s.cardWrapper}>
        <AddProductCard onClick={onAddClick} />
      </div>
    )}

    {products.length > 0 ? (
      products.map((product) => (
        <div key={product.product_id} style={s.cardWrapper}>
          <ProductGridCard product={product} />
        </div>
      ))
    ) : (
      <div style={s.noProducts}>
        <p className="fs-5">No products to show</p>
      </div>
    )}
  </div>
);

export default ProductGrid;
