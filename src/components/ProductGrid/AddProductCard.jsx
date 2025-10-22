// FILE: src/components/ProductGrid/AddProductCard.jsx
import { useState } from "react";
import { addProductCardStyles } from "./AddProductCard.styles";

const AddProductCard = ({ onClick, cardWidth = 320 }) => {
  const [hovered, setHovered] = useState(false);

  const imageHeight = Math.round(cardWidth * 0.65);
  const cardHeight = imageHeight + 68; // match product card height (image + info)

  return (
    <div
      className="add-card"
      style={{
        ...addProductCardStyles.addCard,
        height: `${cardHeight}px`,
        ...(hovered ? addProductCardStyles.addCardHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      aria-label="Add new product"
    >
      <div
        className="add-box"
        style={{
          ...addProductCardStyles.addBox,
          ...(hovered ? addProductCardStyles.addBoxHover : {}),
        }}
      >
        +
      </div>
      <h6 style={addProductCardStyles.addText}>Add Product</h6>
    </div>
  );
};

export default AddProductCard;
