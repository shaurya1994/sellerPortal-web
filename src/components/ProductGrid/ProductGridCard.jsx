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



// import { gridStyles } from "./ProductGrid.styles";

// const ProductGridCard = ({ product }) => {
//   const { name, photos = [] } = product;

//   return (
//     <div className="product-card" style={gridStyles.productCard}>
//       {/* Carousel */}
//       <div
//         id={`carousel-${product.product_id}`}
//         className="carousel slide"
//         data-bs-ride="false"
//       >
//         <div className="carousel-inner">
//           {(photos.length ? photos : [{ photo_url: "/placeholder.jpg" }]).map(
//             (photo, index) => (
//               <div
//                 key={index}
//                 className={`carousel-item ${index === 0 ? "active" : ""}`}
//               >
//                 <img
//                   src={photo.photo_url}
//                   alt={name}
//                   style={gridStyles.carouselImg}
//                 />
//               </div>
//             )
//           )}
//         </div>

//         {photos.length > 1 && (
//           <>
//             <button
//               className="carousel-control-prev"
//               type="button"
//               data-bs-target={`#carousel-${product.product_id}`}
//               data-bs-slide="prev"
//             >
//               <span className="carousel-control-prev-icon" aria-hidden="true" />
//             </button>
//             <button
//               className="carousel-control-next"
//               type="button"
//               data-bs-target={`#carousel-${product.product_id}`}
//               data-bs-slide="next"
//             >
//               <span className="carousel-control-next-icon" aria-hidden="true" />
//             </button>
//           </>
//         )}
//       </div>

//       <div style={gridStyles.productInfo}>
//         <p style={gridStyles.productName}>{name}</p>
//         <button style={gridStyles.viewBtn}>View</button>
//       </div>
//     </div>
//   );
// };

// export default ProductGridCard;

// import { productGridStyles as s } from "./ProductGrid.styles";

// const ProductGridCard = ({ product }) => {
//   const { name, photos = [], product_id } = product;
//   const imageList = photos.length ? photos : [{ photo_url: "/placeholder.jpg" }];

//   return (
//     <div style={s.productCard}>
//       {/* Carousel */}
//       <div
//         id={`carousel-${product_id}`}
//         className="carousel slide"
//         data-bs-ride="false"
//       >
//         <div className="carousel-inner">
//           {imageList.map((photo, i) => (
//             <div
//               key={i}
//               className={`carousel-item ${i === 0 ? "active" : ""}`}
//             >
//               <img src={photo.photo_url} alt={name} style={s.productImage} />
//             </div>
//           ))}
//         </div>

//         {imageList.length > 1 && (
//           <>
//             <button
//               className="carousel-control-prev"
//               type="button"
//               data-bs-target={`#carousel-${product_id}`}
//               data-bs-slide="prev"
//             >
//               <span
//                 className="carousel-control-prev-icon"
//                 aria-hidden="true"
//               ></span>
//             </button>
//             <button
//               className="carousel-control-next"
//               type="button"
//               data-bs-target={`#carousel-${product_id}`}
//               data-bs-slide="next"
//             >
//               <span
//                 className="carousel-control-next-icon"
//                 aria-hidden="true"
//               ></span>
//             </button>
//           </>
//         )}
//       </div>

//       {/* Info */}
//       <div style={s.productInfo}>
//         <p style={s.productName}>{name}</p>
//         <button style={s.viewBtn}>View</button>
//       </div>
//     </div>
//   );
// };

// export default ProductGridCard;
