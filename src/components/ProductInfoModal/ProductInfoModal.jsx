// FILE: src/components/ProductInfoModal/ProductInfoModal.jsx

import { Modal } from "bootstrap";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

import { productInfoModalStyles as styles } from "./ProductInfoModal.styles";
import { getCategoryName } from "../../constants/categoryMap";
import { compressImages } from "../../utils/imageCompressor";
import { editProductImages } from "../../api/products";

const MAX_PHOTOS = 3;

const ProductInfoModal = memo(({ show, onClose, product, onProductRefresh }) => {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const toastRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  // --- Role detection ---
  const { user } = useSelector(selectAuth);
  const role = user?.role || "buyer";
  const isSeller = role === "seller";

  // -------------------- Modal Setup --------------------
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const modal = Modal.getOrCreateInstance(modalEl, {
      backdrop: true,
      keyboard: false,
    });

    const handleHidden = () => {
      document.activeElement.blur();
      onClose?.();
      resetEditState();
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    show ? modal.show() : modal.hide();

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, [show, onClose]);

  // -------------------- Product Data --------------------
  useEffect(() => {
    if (product?.photos) setExistingPhotos(product.photos);
  }, [product]);

  const resetEditState = useCallback(() => {
    setEditMode(false);
    setRemovedIds([]);
    newFiles.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    setNewFiles([]);
  }, [newFiles]);

  // -------------------- Image Lists --------------------
  const visibleExisting = useMemo(
    () => existingPhotos.filter((p) => !removedIds.includes(p.photo_id)),
    [existingPhotos, removedIds]
  );

  const combinedList = useMemo(
    () => [
      ...visibleExisting.map((p) => ({ src: p.photo_url })),
      ...newFiles.map((f) => ({ src: f.preview })),
    ],
    [visibleExisting, newFiles]
  );

  const totalImages = visibleExisting.length + newFiles.length;
  const currentImage = combinedList[currentIndex]?.src ?? null;

  // -------------------- Lightbox Logic --------------------
  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % combinedList.length);
  }, [combinedList.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + combinedList.length) % combinedList.length);
  }, [combinedList.length]);

  const handleKey = useCallback(
    (e) => {
      if (showLightbox) {
        if (["ArrowRight", "ArrowLeft", "Escape"].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.key === "ArrowRight") handleNext();
        else if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === "Escape") {
          setLightboxVisible(false);
          setTimeout(() => {
            setShowLightbox(false);
          }, 200);
        }
        return;
      }

      if (e.key === "Escape" && !showLightbox) {
        const modalInstance = Modal.getInstance(modalRef.current);
        modalInstance?.hide();
      }
    },
    [showLightbox, handleNext, handlePrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, [handleKey]);

  // -------------------- File Handlers --------------------
  const handleFileChange = async (e) => {
    if (!isSeller) return; // buyers cannot upload

    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_PHOTOS - totalImages;
    if (files.length > remaining) {
      alert(`You can add only ${remaining} more image(s).`);
      e.target.value = "";
      return;
    }

    try {
      setIsCompressing(true);
      const compressed = await compressImages(files);
      const withPreview = compressed.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setNewFiles((prev) => [...prev, ...withPreview]);
    } catch {
      alert("Image compression failed.");
    } finally {
      setIsCompressing(false);
      e.target.value = "";
    }
  };

  const handleRemoveExisting = (photo) => {
    if (!isSeller) return; // buyers cannot remove
    setRemovedIds((prev) =>
      prev.includes(photo.photo_id)
        ? prev.filter((id) => id !== photo.photo_id)
        : [...prev, photo.photo_id]
    );
  };

  const handleRemoveNewFile = (index) => {
    if (!isSeller) return; // buyers cannot remove
    const file = newFiles[index];
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // -------------------- Toast --------------------
  const showToast = (message, type = "success") => {
    const el = toastRef.current;
    if (!el) return;

    el.textContent = message;
    el.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
    el.style.opacity = "1";
    el.style.display = "block";

    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => (el.style.display = "none"), 300);
    }, 2500);
  };

  // -------------------- Save Changes --------------------
  const handleSaveChanges = async () => {
    if (!isSeller) return; // buyers cannot save
    if (!removedIds.length && !newFiles.length) return;

    const formData = new FormData();
    formData.append("remove", JSON.stringify(removedIds));
    newFiles.forEach((f) => formData.append("photos", f));

    try {
      setIsUploading(true);
      const res = await editProductImages(product.product_id, formData);
      setExistingPhotos(res.photos || []);
      resetEditState();
      onProductRefresh?.({ ...product, photos: res.photos || [] });
      showToast("✅ Images updated successfully!");
      modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Image update failed:", err);
      showToast("❌ Failed to update images.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // -------------------- Render --------------------
  if (!product) return null;

  // Normalize product name (for buyer/seller)
  const productName = product.name || product.public_code || "Unnamed Product";
  const { category_id, variants = [] } = product;
  const hasSize = variants.some((v) => v.size);
  const hasWeight = variants.some((v) => v.weight);
  const disableSave = !removedIds.length && !newFiles.length;

  return (
    <>
      {/* ---------- MODAL ---------- */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={styles.modalContent}>
            <div className="modal-header">
              <h5 className="modal-title" style={styles.modalTitle}>
                {editMode ? productName : "Product Information"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body" style={styles.modalBody}>
              {!editMode ? (
                <>
                  {/* ---------- VIEW MODE ---------- */}
                  <div style={styles.container}>
                    <div style={styles.imageSection}>
                      {visibleExisting.length > 0 ? (
                        <img
                          src={visibleExisting[0].photo_url}
                          alt={productName}
                          style={styles.mainImage}
                          onClick={() => {
                            setShowLightbox(true);
                            setLightboxVisible(true);
                            setCurrentIndex(0);
                          }}
                          className="modal-image-hover"
                        />
                      ) : (
                        <div style={styles.noImage}>No Image Available</div>
                      )}

                      {/* 👇 Conditional button logic */}
                      {isSeller ? (
                        <button
                          style={styles.editButton}
                          onClick={() => setEditMode(true)}
                        >
                          {existingPhotos.length ? "Edit Images" : "Add Images"}
                        </button>
                      ) : (
                        <button
                          style={styles.editButton}
                          onClick={() => alert("🛒 Place Order coming soon")}
                        >
                          Place Order
                        </button>
                      )}
                    </div>
                    <div style={styles.infoSection}>
                      <h4 style={styles.name}>{productName}</h4>
                      <p style={styles.category}>{getCategoryName(category_id)}</p>

                      <table style={styles.table}>
                        <thead>
                          <tr>
                            {hasSize && <th>Size</th>}
                            {hasWeight && <th>Weight</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {variants.map((v, i) => (
                            <tr key={i}>
                              {hasSize && <td>{v.size || "-"}</td>}
                              {hasWeight && <td>{v.weight || "-"}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <style>
                    {`
                      .modal-image-hover:hover {
                        transform: scale(1.05);
                        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                      }
                      table {
                        border-collapse: collapse;
                        margin-top: 8px;
                        width: 100%;
                      }
                      table th, table td {
                        border: 1px solid #ddd;
                        padding: 8px 12px;
                        text-align: center;
                      }
                      table th {
                        background-color: #f5f5f5;
                        font-weight: 600;
                      }
                      table tr:nth-child(even) { background-color: #fafafa; }
                      table tr:hover { background-color: #f1f1f1; }
                    `}
                  </style>
                </>
              ) : (
                <>
                  {/* ---------- EDIT MODE ---------- */}
                  {isSeller && (
                    <div style={styles.editSection}>
                      <h5 style={styles.editTitle}>
                        Edit Images ({totalImages}/{MAX_PHOTOS})
                      </h5>

                      <div style={styles.imageGrid}>
                        {visibleExisting.map((p) => (
                          <div key={p.photo_id} style={styles.imageCard}>
                            <img src={p.photo_url} alt="existing" style={styles.imageThumb} />
                            <button
                              style={styles.removeBtn}
                              onClick={() => handleRemoveExisting(p)}
                            >
                              ×
                            </button>
                          </div>
                        ))}

                        {newFiles.map((f, i) => (
                          <div key={i} style={styles.imageCard}>
                            <img src={f.preview} alt="new" style={styles.imageThumb} />
                            <button
                              style={styles.removeBtn}
                              onClick={() => handleRemoveNewFile(i)}
                            >
                              ×
                            </button>
                          </div>
                        ))}

                        {isCompressing && (
                          <div style={{ color: "#666", fontSize: "0.9rem" }}>
                            Compressing images…
                          </div>
                        )}

                        {totalImages < MAX_PHOTOS && !isCompressing && (
                          <div
                            style={styles.addCard}
                            onClick={() => fileInputRef.current.click()}
                          >
                            <div style={styles.addSymbol}>＋</div>
                            <div style={styles.addText}>Add Image</div>
                          </div>
                        )}
                      </div>

                      <div style={styles.actionRow}>
                        <button
                          style={styles.cancelBtn}
                          onClick={resetEditState}
                          disabled={isUploading}
                        >
                          Cancel
                        </button>
                        <button
                          style={{
                            ...styles.saveBtn,
                            opacity: disableSave || isUploading ? 0.6 : 1,
                          }}
                          onClick={handleSaveChanges}
                          disabled={disableSave || isUploading}
                        >
                          {isUploading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- LIGHTBOX ---------- */}
      {showLightbox && currentImage && (
        <div
          style={{
            ...styles.lightboxOverlay,
            opacity: lightboxVisible ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
          onClick={() => {
            setLightboxVisible(false);
            setTimeout(() => setShowLightbox(false), 200);
          }}
        >
          {combinedList.length > 1 && (
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
            alt={productName}
            style={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          {combinedList.length > 1 && (
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

      {/* ---------- TOAST ---------- */}
      <div ref={toastRef} style={styles.toast}></div>
    </>
  );
});

export default ProductInfoModal;
