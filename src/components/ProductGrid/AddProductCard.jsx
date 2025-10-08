import { productGridStyles as s } from "./ProductGrid.styles";

const AddProductCard = ({ onClick }) => (
  <div
    style={s.addCard}
    className="add-card"
    onClick={onClick}
  >
    <div style={s.addBox}>+</div>
    <h6 style={s.addText}>Add Product</h6>
  </div>
);

export default AddProductCard;
