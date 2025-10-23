// FILE: src/pages/ProductsPage/ProductsPage.jsx

import { useEffect, useRef, useState, useCallback } from "react";

import { COLORS } from "../../constants/colors";
import { productsPageStyles } from "./ProductsPage.styles";

import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// API Calls
import { fetchSellerProducts } from "../../api/products";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const CARD_MIN = 240;
  const CARD_MAX = 360;
  const GRID_GAP = 24;
  const ROWS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = Math.max(0, Math.floor(el.getBoundingClientRect().width));
    setContainerWidth(w);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSellerProducts();
      setProducts(data.products || []);
      setNetworkError(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setNetworkError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const cardWidth = Math.max(
    CARD_MIN,
    Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
  );
  const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

  const columns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
  );

  const itemsPerPage = Math.max(1, ROWS_PER_PAGE * columns);
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleProducts = products.slice(start, end);

  const handleAddProductClick = () => setShowAddModal(true);
  const handleProductAdded = async () => {
    await loadProducts();
    setShowAddModal(false);
  };

  const renderContent = () => {
    // Loading state centered, hides header
    if (loading) {
      return (
        <div style={productsPageStyles.loadingContainer}>
          <div style={productsPageStyles.loadingSpinner}></div>
          <p style={productsPageStyles.loadingText}>Loading products…</p>
        </div>
      );
    }

    if (networkError) {
      return (
        <div style={productsPageStyles.networkErrorContainer}>
          {/* Enhanced Inline SVG Illustration */}
          <NetworkErrorIcon />
          <h4 style={productsPageStyles.networkErrorTitle}>No Network Connection</h4>
          <p style={productsPageStyles.networkErrorText}>
            Kindly check your internet connection and try again.
          </p>
          <button
            className="btn"
            style={{
              ...productsPageStyles.retryBtn,
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              border: `1px solid ${COLORS.primary}`,
            }}
            onClick={loadProducts}
          >
            Retry
          </button>
        </div>
      );
    }

    if (!networkError && totalItems === 0) {
      return (
        <div style={productsPageStyles.emptyState}>
          <p style={productsPageStyles.emptyText}>
            You have no products yet.
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={handleAddProductClick}
            style={productsPageStyles.addProductBtn}
          >
            ➕ Add Product
          </button>
        </div>
      );
    }

    return (
      <ProductGrid
        products={visibleProducts}
        showAddCard={true}
        onAddClick={handleAddProductClick}
        cardWidth={effectiveCardWidth}
        gap={GRID_GAP}
      />
    );
  };

  const showHeader = !loading && !networkError;

  return (
    <div style={productsPageStyles.container}>
      {/* Header */}
      {showHeader && (
        <div style={productsPageStyles.headerRow}>
          <div style={productsPageStyles.headerLeft}>
            <div style={productsPageStyles.titleWrapper}>
              <h2 style={productsPageStyles.title}>My Products</h2>
              <div style={productsPageStyles.titleUnderline} />
            </div>
          </div>
          <div style={productsPageStyles.headerRight}></div>
        </div>
      )}

      {/* Grid Container */}
      <div ref={containerRef} style={productsPageStyles.gridContainer}>
        {renderContent()}
      </div>

      {/* Pagination */}
      {!networkError && !loading && totalItems > 0 && totalPages > 1 && (
        <div style={productsPageStyles.paginationRow}>
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(p) => setCurrentPage(p)}
            styles={{
              container: productsPageStyles.paginationContainer,
              btn: productsPageStyles.paginationBtn,
              btnActive: productsPageStyles.paginationBtnActive,
              btnDisabled: productsPageStyles.paginationBtnDisabled,
            }}
          />
        </div>
      )}

      {/* Add Product Modal */}
      <ProductAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleProductAdded}
      />
    </div>
  );
};

export default ProductsPage;
