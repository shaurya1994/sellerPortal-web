import { gridStyles } from "./ProductGrid.styles";

const ProductGridCard = ({ product }) => {
  const { name, photos = [] } = product;
  const hasImages = photos.length > 0;
  const multipleImages = photos.length > 1;

  // Use placeholder if no images
  const imageList = hasImages ? photos : [{ photo_url: null }];

  return (
    <div className="product-card" style={gridStyles.productCard}>
      <div
        id={`carousel-${product.product_id}`}
        className="carousel slide"
        data-bs-ride="false"
      >
        {/* Show carousel indicators only if multiple images */}
        {multipleImages && (
          <div className="carousel-indicators" style={gridStyles.carouselIndicators}>
            {imageList.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target={`#carousel-${product.product_id}`}
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
              />
            ))}
          </div>
        )}

        {/* Carousel Inner */}
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
                  style={gridStyles.carouselImg}
                />
              ) : (
                <div style={gridStyles.placeholderBox}>
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel controls only if multiple images */}
        {multipleImages && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel-${product.product_id}`}
              data-bs-slide="prev"
              style={gridStyles.carouselPrevBtn}
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
        <p style={gridStyles.productName}>{name}</p>
        <button style={gridStyles.viewBtn}>View</button>
      </div>
    </div>
  );
};

export default ProductGridCard;
