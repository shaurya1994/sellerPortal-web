// FILE: AddProductCard.jsx
import { gridStyles } from "./ProductGrid.styles";

const AddProductCard = ({ onClick }) => {
  return (
    <div
      className="add-card"
      style={gridStyles.addCard}
      onClick={onClick}
      role="button"
      aria-label="Add new product"
    >
      <div className="add-box" style={gridStyles.addBox}>
        +
      </div>
      <h6 style={gridStyles.addText}>Add Product</h6>
    </div>
  );
};

export default AddProductCard;
