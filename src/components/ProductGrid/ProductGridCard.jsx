// FILE: ProductGridCard.jsx
import { useState } from "react";
import { gridStyles } from "./ProductGrid.styles";
import { COLORS } from "../../constants/colors";

const ProductGridCard = ({ product, cardWidth = 320 }) => {
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const { name, photos = [] } = product;
  const hasImages = photos.length > 0;
  const multipleImages = photos.length > 1;
  const imageList = hasImages ? photos : [{ photo_url: null }];

  // derive image height using an aspect ratio so it scales with card width
  const imageHeight = Math.round(cardWidth * 0.65); // 65% height ratio

  return (
    <div
      className="product-card"
      style={{
        ...gridStyles.productCard,
        ...(hovered ? gridStyles.productCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="article"
      aria-label={name}
    >
      <div
        id={`carousel-${product.product_id}`}
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="false"
        style={{ position: "relative" }}
      >
        {multipleImages && (
          <div style={gridStyles.carouselIndicators}>
            {imageList.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target={`#carousel-${product.product_id}`}
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: i === 0 ? COLORS.primary : COLORS.textLight,
                  border: "none",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        )}

        <div className="carousel-inner">
          {imageList.map((photo, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              {photo.photo_url ? (
                <img
                  src={photo.photo_url}
                  alt={`${name} image ${index + 1}`}
                  style={{
                    ...gridStyles.carouselImg,
                    height: `${imageHeight}px`,
                  }}
                />
              ) : (
                <div style={{ ...gridStyles.placeholderBox, height: `${imageHeight}px` }}>
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {multipleImages && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel-${product.product_id}`}
              data-bs-slide="prev"
              style={gridStyles.carouselPrevBtn}
              aria-label="Previous image"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={gridStyles.carouselArrowIcon}
              />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carousel-${product.product_id}`}
              data-bs-slide="next"
              style={gridStyles.carouselNextBtn}
              aria-label="Next image"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={gridStyles.carouselArrowIcon}
              />
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div style={gridStyles.productInfo}>
        <p style={gridStyles.productName} title={name}>
          {name}
        </p>
        <button
          style={{
            ...gridStyles.viewBtn,
            ...(btnHover ? gridStyles.viewBtnHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={() => console.log("View product", product.product_id)}
          aria-label={`View ${name}`}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductGridCard;
