// FILE: ProductInfoContainer.jsx
import { useState, useEffect, useCallback } from "react";
import { productInfoContainerStyles as styles } from "./ProductInfoContainer.styles";

const ProductInfoContainer = ({ product }) => {
  if (!product) return null;

  const {
    photos = [],
    name,
    description,
    category_id,
    variants = [],
  } = product;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const hasImages = photos.length > 0;
  const currentImage = hasImages ? photos[currentIndex]?.photo_url : null;

  const handleNext = useCallback(() => {
    if (!photos.length) return;
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    if (!photos.length) return;
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleKey = useCallback(
    (e) => {
      if (!showLightbox) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setShowLightbox(false);
    },
    [showLightbox, handleNext, handlePrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const toggleLightbox = () => setShowLightbox((v) => !v);

  // Determine table columns dynamically
  const hasSize = variants.some((v) => v.size);
  const hasWeight = variants.some((v) => v.weight);

  return (
    <div style={styles.container}>
      {/* LEFT SIDE - IMAGE */}
      <div style={styles.imageSection}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={name}
            style={styles.mainImage}
            onClick={toggleLightbox}
            className="hoverable-image"
          />
        ) : (
          <div style={styles.noImage}>No Image Available</div>
        )}
      </div>

      {/* RIGHT SIDE - INFO */}
      <div style={styles.infoSection}>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.category}>Category ID: {category_id}</p>
        {description && <p style={styles.description}>{description}</p>}

        <table style={styles.table}>
          <thead>
            <tr>
              {hasSize && <th>Size</th>}
              {hasWeight && <th>Weight</th>}
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, i) => (
              <tr key={variant.variant_id || i}>
                {hasSize && <td>{variant.size || "-"}</td>}
                {hasWeight && <td>{variant.weight || "-"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {showLightbox && (
        <div style={styles.lightboxOverlay} onClick={toggleLightbox}>
          <button
            style={{ ...styles.arrowBtn, left: "20px" }}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            ‹
          </button>
          <img
            src={currentImage}
            alt={name}
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={{ ...styles.arrowBtn, right: "20px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductInfoContainer;
