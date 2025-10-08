import { productGridStyles as s } from "./ProductGrid.styles";

const ProductGridCard = ({ product }) => {
  const { name, photos = [], product_id } = product;
  const imageList = photos.length ? photos : [{ photo_url: "/placeholder.jpg" }];

  return (
    <div style={s.productCard}>
      {/* Carousel */}
      <div
        id={`carousel-${product_id}`}
        className="carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-inner">
          {imageList.map((photo, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <img src={photo.photo_url} alt={name} style={s.productImage} />
            </div>
          ))}
        </div>

        {imageList.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel-${product_id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carousel-${product_id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div style={s.productInfo}>
        <p style={s.productName}>{name}</p>
        <button style={s.viewBtn}>View</button>
      </div>
    </div>
  );
};

export default ProductGridCard;
