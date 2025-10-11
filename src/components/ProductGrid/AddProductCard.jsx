import React from "react";
import { gridStyles } from "./ProductGrid.styles";

const AddProductCard = ({ onClick }) => {
  return (
    <div className="add-card" style={gridStyles.addCard} onClick={onClick}>
      <div className="add-box" style={gridStyles.addBox}>+</div>
      <h6 style={gridStyles.addText}>Add Product</h6>
    </div>
  );
};

export default AddProductCard;

// import { productGridStyles as s } from "./ProductGrid.styles";

// const AddProductCard = ({ onClick }) => (
//   <div
//     style={s.addCard}
//     className="add-card"
//     onClick={onClick}
//   >
//     <div style={s.addBox}>+</div>
//     <h6 style={s.addText}>Add Product</h6>
//   </div>
// );

// export default AddProductCard;
