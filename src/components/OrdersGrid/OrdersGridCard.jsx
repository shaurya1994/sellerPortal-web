// FILE: src/components/OrdersGrid/OrdersGridCard.jsx

import { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { getCategoryName } from '../../constants/categoryMap';
import { ordersGridCardStyles as S } from './OrdersGridCard.styles';

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

  const imageUrl = photos[imageIndex]?.photo_url || '';
  const categoryName = getCategoryName(category_id);
  const borderColor = status === 'delivered' ? COLORS.success : COLORS.in_process;

  // --- Weight logic ---
  const parseWeight = (weightStr) => {
    if (!weightStr) return { value: 0, unit: 'KG' };
    const match = weightStr.match(/([\d.]+)\s*(KG|GM)/i);
    if (!match) return { value: 0, unit: 'KG' };
    return { value: parseFloat(match[1]), unit: match[2].toUpperCase() };
  };

  const weightData = parseWeight(weight);
  const totalWeightValue = weightData.value * total_quantity;

  const formatTotalWeight = () => {
    if (weightData.unit === 'GM' && totalWeightValue >= 1000) {
      return `${(totalWeightValue / 1000).toFixed(1)} KG`;
    }
    return `${totalWeightValue.toFixed(1)} ${weightData.unit}`;
  };

  // --- Image controls ---
  const handlePrev = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div
      style={{
        ...S.card,
        borderColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = S.card.boxShadow;
      }}
    >
      <div style={S.content}>
        {/* IMAGE SIDE */}
        <div style={S.imageContainer}>
          {imageUrl ? (
            <>
              <img src={imageUrl} alt={product_name} style={S.image} />
              {photos.length > 1 && (
                <>
                  <button style={S.arrowLeft} onClick={handlePrev}>
                    ‹
                  </button>
                  <button style={S.arrowRight} onClick={handleNext}>
                    ›
                  </button>
                </>
              )}
            </>
          ) : (
            <div style={S.placeholder}>📦</div>
          )}
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
