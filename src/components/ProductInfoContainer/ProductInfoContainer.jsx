// FILE: ProductInfoContainer.jsx
import { useState, useEffect, useCallback } from "react";
import { productInfoContainerStyles as styles } from "./ProductInfoContainer.styles";
import { getCategoryName } from "../../constants/categoryMap";

const ProductInfoContainer = ({ product }) => {
  if (!product) return null;

  const { photos = [], name, category_id, variants = [] } = product;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const hasImages = photos.length > 0;
  const currentImage = hasImages ? photos[currentIndex]?.photo_url : null;

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleKey = useCallback(
    (e) => {
      if (showLightbox) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") {
          e.stopPropagation();
          e.preventDefault();
          setShowLightbox(false);
        }
      }
    },
    [showLightbox, handleNext, handlePrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, [handleKey]);

  const toggleLightbox = () => setShowLightbox((v) => !v);

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
            className="modal-image-hover"
          />
        ) : (
          <div style={styles.noImage}>No Image Available</div>
        )}
      </div>

      {/* RIGHT SIDE - INFO */}
      <div style={styles.infoSection}>
        <h4 style={styles.name}>Name: {name}</h4>
        <p style={styles.category}>Category: {getCategoryName(category_id)}</p>

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
          {photos.length > 1 && (
            <button
              style={{ ...styles.arrowBtn, left: "20px" }}
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              ‹
            </button>
          )}

          <img
            src={currentImage}
            alt={name}
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <button
              style={{ ...styles.arrowBtn, right: "20px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Scoped hover and table styles */}
      <style>
        {`
          .modal-image-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          table {
            border-collapse: collapse;
            margin-top: 10px;
            width: auto;
            min-width: 200px;
          }

          table th, table td {
            border: 2px solid #555;
            padding: 8px 16px;
            text-align: center;
          }

          table th {
            background-color: #f7f7f7;
            font-weight: 600;
          }

          table tr:nth-child(even) {
            background-color: #fafafa;
          }

          table tr:hover {
            background-color: #f1f1f1;
          }
        `}
      </style>
    </div>
  );
};

export default ProductInfoContainer;
