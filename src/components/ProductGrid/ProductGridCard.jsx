// FILE: src/ProductGrid/ProductGridCard.jsx

import { useState, useEffect } from "react";
import { productGridCardStyles } from "./ProductGridCard.styles";
import { COLORS } from "../../constants/colors";

const ProductGridCard = ({ product, cardWidth = 320 }) => {
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Normalize product name for both buyer/seller
  const productName = product.name || product.public_code || "Unnamed Product";
  const { photos = [] } = product;
  const hasImages = photos.length > 0;
  const multipleImages = photos.length > 1;
  const imageList = hasImages ? photos : [{ photo_url: null }];
  const imageHeight = Math.round(cardWidth * 0.65);

  // Track carousel slide changes
  useEffect(() => {
    if (!multipleImages) return;
    const carouselEl = document.getElementById(`carousel-${product.product_id}`);
    if (!carouselEl) return;

    const handleSlide = (e) => setActiveIndex(e.to);
    carouselEl.addEventListener("slid.bs.carousel", handleSlide);

    // Speed up transition
    carouselEl.querySelectorAll(".carousel-item").forEach((item) => {
      item.style.transition = "transform 0.35s ease-in-out";
    });

    return () => carouselEl.removeEventListener("slid.bs.carousel", handleSlide);
  }, [multipleImages, product.product_id]);

  // Dispatch custom event to open shared modal
  const handleViewClick = () => {
    window.dispatchEvent(new CustomEvent("open-product-modal", { detail: product }));
  };

  return (
    <div
      className="product-card"
      style={{
        ...productGridCardStyles.productCard,
        ...(hovered ? productGridCardStyles.productCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="article"
      aria-label={productName}
    >
      {/* Product Carousel */}
      <div
        id={`carousel-${product.product_id}`}
        className="carousel slide"
        data-bs-ride="false"
        data-bs-interval="false"
        data-bs-pause="false"
        style={{ position: "relative" }}
      >
        {multipleImages && (
          <div style={productGridCardStyles.carouselIndicators}>
            {imageList.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => e.preventDefault()}
                data-bs-target={`#carousel-${product.product_id}`}
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor:
                    i === activeIndex ? COLORS.primary : COLORS.textLight,
                  border: "none",
                  borderRadius: "2px",
                  cursor: "default",
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
              style={{ height: `${imageHeight}px` }}
            >
              {photo.photo_url ? (
                <img
                  src={photo.photo_url}
                  alt={`${productName} image ${index + 1}`}
                  style={{
                    ...productGridCardStyles.carouselImg,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.insertAdjacentHTML(
                      "afterend",
                      `<div style="
                        width:100%;
                        height:100%;
                        background-color:#e9ecef;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        color:#6c757d;
                        font-size:14px;
                        font-weight:500;">
                        Image not available
                      </div>`
                    );
                  }}
                />
              ) : (
                <div
                  style={{
                    ...productGridCardStyles.placeholderBox,
                    height: "100%",
                  }}
                >
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
              style={{
                ...productGridCardStyles.carouselPrevBtn,
                ...(hoveredPrev ? productGridCardStyles.carouselPrevBtnHover : {}),
              }}
              onMouseEnter={() => setHoveredPrev(true)}
              onMouseLeave={() => setHoveredPrev(false)}
              onMouseDown={(e) => e.currentTarget.blur()}
              aria-label="Previous image"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={productGridCardStyles.carouselArrowIcon}
              />
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carousel-${product.product_id}`}
              data-bs-slide="next"
              style={{
                ...productGridCardStyles.carouselNextBtn,
                ...(hoveredNext ? productGridCardStyles.carouselNextBtnHover : {}),
              }}
              onMouseEnter={() => setHoveredNext(true)}
              onMouseLeave={() => setHoveredNext(false)}
              onMouseDown={(e) => e.currentTarget.blur()}
              aria-label="Next image"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={productGridCardStyles.carouselArrowIcon}
              />
            </button>
          </>
        )}
      </div>

      {/* Product Info Section */}
      <div style={productGridCardStyles.productInfo}>
        <p style={productGridCardStyles.productName} title={productName}>
          {productName}
        </p>
        <button
          style={{
            ...productGridCardStyles.viewBtn,
            ...(btnHover ? productGridCardStyles.viewBtnHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={handleViewClick}
          aria-label={`View ${productName}`}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductGridCard;

// import { useState, useEffect } from "react";
// import { productGridCardStyles } from "./ProductGridCard.styles";
// import { COLORS } from "../../constants/colors";

// const ProductGridCard = ({ product, cardWidth = 320 }) => {
//   const [hovered, setHovered] = useState(false);
//   const [btnHover, setBtnHover] = useState(false);
//   const [hoveredPrev, setHoveredPrev] = useState(false);
//   const [hoveredNext, setHoveredNext] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const { name, photos = [] } = product;
//   const hasImages = photos.length > 0;
//   const multipleImages = photos.length > 1;
//   const imageList = hasImages ? photos : [{ photo_url: null }];
//   const imageHeight = Math.round(cardWidth * 0.65);

//   // Track carousel slide changes
//   useEffect(() => {
//     if (!multipleImages) return;
//     const carouselEl = document.getElementById(`carousel-${product.product_id}`);
//     if (!carouselEl) return;

//     const handleSlide = (e) => setActiveIndex(e.to);
//     carouselEl.addEventListener("slid.bs.carousel", handleSlide);

//     // Speed up transition
//     carouselEl.querySelectorAll(".carousel-item").forEach((item) => {
//       item.style.transition = "transform 0.35s ease-in-out"; // default ~0.6s → faster
//     });

//     return () => carouselEl.removeEventListener("slid.bs.carousel", handleSlide);
//   }, [multipleImages, product.product_id]);

//   // Dispatch custom event to open shared modal
//   const handleViewClick = () => {
//     window.dispatchEvent(new CustomEvent("open-product-modal", { detail: product }));
//   };

//   return (
//     <div
//       className="product-card"
//       style={{
//         ...productGridCardStyles.productCard,
//         ...(hovered ? productGridCardStyles.productCardHover : {}),
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       role="article"
//       aria-label={name}
//     >
//       {/* Product Carousel */}
//       <div
//         id={`carousel-${product.product_id}`}
//         className="carousel slide"
//         data-bs-ride="false"
//         data-bs-interval="false"
//         data-bs-pause="false"
//         style={{ position: "relative" }}
//       >
//         {multipleImages && (
//           <div style={productGridCardStyles.carouselIndicators}>
//             {imageList.map((_, i) => (
//               <button
//                 key={i}
//                 type="button"
//                 onClick={(e) => e.preventDefault()} // disable click
//                 data-bs-target={`#carousel-${product.product_id}`}
//                 data-bs-slide-to={i}
//                 className={i === 0 ? "active" : ""}
//                 aria-label={`Go to image ${i + 1}`}
//                 style={{
//                   width: "20px",
//                   height: "4px",
//                   backgroundColor:
//                     i === activeIndex ? COLORS.primary : COLORS.textLight,
//                   border: "none",
//                   borderRadius: "2px",
//                   cursor: "default",
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         <div className="carousel-inner">
//           {imageList.map((photo, index) => (
//             <div
//               key={index}
//               className={`carousel-item ${index === 0 ? "active" : ""}`}
//               style={{ height: `${imageHeight}px` }} // reserve height
//             >
//               {photo.photo_url ? (
//                 <img
//                   src={photo.photo_url}
//                   alt={`${name} image ${index + 1}`}
//                   style={{
//                     ...productGridCardStyles.carouselImg,
//                     height: "100%",
//                     width: "100%",
//                     objectFit: "cover",
//                     display: "block",
//                   }}
//                   onError={(e) => {
//                     // fallback if image fails to load
//                     e.target.style.display = "none";
//                     e.target.insertAdjacentHTML(
//                       "afterend",
//                       `<div style="
//                         width:100%;
//                         height:100%;
//                         background-color:#e9ecef;
//                         display:flex;
//                         align-items:center;
//                         justify-content:center;
//                         color:#6c757d;
//                         font-size:14px;
//                         font-weight:500;">
//                         Image not available
//                       </div>`
//                     );
//                   }}
//                 />
//               ) : (
//                 <div
//                   style={{
//                     ...productGridCardStyles.placeholderBox,
//                     height: "100%",
//                   }}
//                 >
//                   <span>No Image Available</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {multipleImages && (
//           <>
//             <button
//               className="carousel-control-prev"
//               type="button"
//               data-bs-target={`#carousel-${product.product_id}`}
//               data-bs-slide="prev"
//               style={{
//                 ...productGridCardStyles.carouselPrevBtn,
//                 ...(hoveredPrev ? productGridCardStyles.carouselPrevBtnHover : {}),
//               }}
//               onMouseEnter={() => setHoveredPrev(true)}
//               onMouseLeave={() => setHoveredPrev(false)}
//               onMouseDown={(e) => e.currentTarget.blur()}
//               aria-label="Previous image"
//             >
//               <span
//                 className="carousel-control-prev-icon"
//                 aria-hidden="true"
//                 style={productGridCardStyles.carouselArrowIcon}
//               />
//             </button>

//             <button
//               className="carousel-control-next"
//               type="button"
//               data-bs-target={`#carousel-${product.product_id}`}
//               data-bs-slide="next"
//               style={{
//                 ...productGridCardStyles.carouselNextBtn,
//                 ...(hoveredNext ? productGridCardStyles.carouselNextBtnHover : {}),
//               }}
//               onMouseEnter={() => setHoveredNext(true)}
//               onMouseLeave={() => setHoveredNext(false)}
//               onMouseDown={(e) => e.currentTarget.blur()}
//               aria-label="Next image"
//             >
//               <span
//                 className="carousel-control-next-icon"
//                 aria-hidden="true"
//                 style={productGridCardStyles.carouselArrowIcon}
//               />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Product Info Section */}
//       <div style={productGridCardStyles.productInfo}>
//         <p style={productGridCardStyles.productName} title={name}>
//           {name}
//         </p>
//         <button
//           style={{
//             ...productGridCardStyles.viewBtn,
//             ...(btnHover ? productGridCardStyles.viewBtnHover : {}),
//           }}
//           onMouseEnter={() => setBtnHover(true)}
//           onMouseLeave={() => setBtnHover(false)}
//           onClick={handleViewClick}
//           aria-label={`View ${name}`}
//         >
//           View
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductGridCard;
