// FILE: src/components/ProductGrid/AddProductCard.jsx
import { addProductCardStyles } from "./AddProductCard.styles";

const AddProductCard = ({ onClick }) => {
  return (
    <div
      className="add-card"
      style={addProductCardStyles.addCard}
      onClick={onClick}
      role="button"
      aria-label="Add new product"
    >
      <div className="add-box" style={addProductCardStyles.addBox}>
        +
      </div>
      <h6 style={addProductCardStyles.addText}>Add Product</h6>
    </div>
  );
};

export default AddProductCard;
