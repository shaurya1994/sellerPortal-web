// FILE: src/components/OrdersGrid/OrdersGridCard.jsx

import { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { getCategoryName } from '../../constants/categoryMap';
import { orderGridCardStyles as S } from './OrdersGridCard.styles';

const OrdersGridCard = ({ order }) => {
  const {
    product_name,
    photos = [],
    status,
    total_quantity,
    size,
    weight,
    category_id,
  } = order;

  const [imageIndex, setImageIndex] = useState(0);
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);

  const imageUrl = photos[imageIndex]?.photo_url || '';
  const categoryName = getCategoryName(category_id);
  const borderColor = status === 'delivered' ? COLORS.success : COLORS.in_process;

  // weight parsing / formatting
  const parseWeight = (weightStr) => {
    if (!weightStr) return { value: 0, unit: 'KG' };
    const match = weightStr.match(/([\d.]+)\s*(KG|GM)/i);
    if (!match) return { value: 0, unit: 'KG' };
    return { value: parseFloat(match[1]), unit: match[2].toUpperCase() };
  };
  const weightData = parseWeight(weight);
  const totalWeightValue = weightData.value * total_quantity;
  const formatTotalWeight = () =>
    weightData.unit === 'GM' && totalWeightValue >= 1000
      ? `${(totalWeightValue / 1000).toFixed(1)} KG`
      : `${totalWeightValue.toFixed(1)} ${weightData.unit}`;

  // carousel logic
  const handlePrev = (e) => {
    e.stopPropagation();
    if (!photos.length) return;
    setImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    if (!photos.length) return;
    setImageIndex((prev) => (prev + 1) % photos.length);
  };
  const goTo = (index) => setImageIndex((index + photos.length) % photos.length);

  return (
    <div
      style={{
        ...S.card,
        borderColor,
        paddingRight: S.cardPaddingRight,
      }}
    >
      <div style={S.content}>
        {/* IMAGE SIDE */}
        <div style={S.imageContainer}>
          <div style={S.imageWrapper}>
            {imageUrl ? (
              <img src={imageUrl} alt={product_name} style={S.image} />
            ) : (
              <div style={S.placeholder}>📦</div>
            )}

            {photos.length > 1 && (
              <>
                {/* Prev Button */}
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePrev}
                  onMouseEnter={() => setHoveredPrev(true)}
                  onMouseLeave={() => setHoveredPrev(false)}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{
                    ...S.carouselPrevBtn,
                    ...(hoveredPrev ? S.carouselPrevBtnHover : {}),
                  }}
                >
                  <span style={S.carouselArrowLeft}></span>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNext}
                  onMouseEnter={() => setHoveredNext(true)}
                  onMouseLeave={() => setHoveredNext(false)}
                  onMouseDown={(e) => e.currentTarget.blur()}
                  style={{
                    ...S.carouselNextBtn,
                    ...(hoveredNext ? S.carouselNextBtnHover : {}),
                  }}
                >
                  <span style={S.carouselArrowRight}></span>
                </button>

                {/* Dots */}
                <div style={S.dotsWrap}>
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to image ${idx + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(idx);
                      }}
                      style={{
                        ...S.dot,
                        ...(idx === imageIndex ? S.dotActive : {}),
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={S.rightColumn}>
          <div style={S.statsRow}>
            <div style={S.statBlock}>
              <div style={S.statNumber}>{total_quantity}</div>
              <div style={S.statLabel}>Total Quantity</div>
            </div>

            <div style={S.statDivider}></div>

            <div style={S.statBlock}>
              <div style={S.statNumber}>{formatTotalWeight()}</div>
              <div style={S.statLabel}>~ Approx Weight</div>
            </div>
          </div>

          <div style={S.details}>
            <div style={S.productName} title={product_name}>
              {product_name}
            </div>
            <div style={S.category}>{categoryName}</div>
            <div style={S.meta}>
              {size} • {weight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersGridCard;
