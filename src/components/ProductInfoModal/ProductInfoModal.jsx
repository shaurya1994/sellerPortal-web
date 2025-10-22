// FILE: src/ProductInfoModal/ProductInfoModal.jsx
import { Modal } from "bootstrap";
import { useEffect, useRef, useState, useCallback, memo } from "react";

import { editProductImages } from "../../api/products";
import { getCategoryName } from "../../constants/categoryMap";
import { compressImages } from "../../utils/imageCompressor";
import { productInfoModalStyles as styles } from "./ProductInfoModal.styles";

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
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ---- Modal setup ----
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl, { backdrop: true, keyboard: true });

    const handleHidden = () => {
      document.activeElement.blur(); // prevent aria-hidden focus warning
      onClose && onClose();
      resetEditState();
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [onClose]);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl);
    show ? modal.show() : modal.hide();
  }, [show]);

  useEffect(() => {
    if (product?.photos) setExistingPhotos(product.photos);
  }, [product]);

  const resetEditState = () => {
    setEditMode(false);
    setRemovedIds([]);
    newFiles.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    setNewFiles([]);
  };

  // ---- Lightbox handlers ----
  const visibleExisting = existingPhotos.filter((p) => !removedIds.includes(p.photo_id));
  const combinedList = [
    ...visibleExisting.map((p) => ({ src: p.photo_url })),
    ...newFiles.map((f) => ({ src: f.preview })),
  ];

  const handleNext = useCallback(() => {
    if (combinedList.length > 0)
      setCurrentIndex((i) => (i + 1) % combinedList.length);
  }, [combinedList.length]);

  const handlePrev = useCallback(() => {
    if (combinedList.length > 0)
      setCurrentIndex((i) => (i - 1 + combinedList.length) % combinedList.length);
  }, [combinedList.length]);

  const handleKey = useCallback(
    (e) => {
      if (!showLightbox) return;
      if (["ArrowRight", "ArrowLeft", "Escape"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") setShowLightbox(false);
    },
    [showLightbox, handleNext, handlePrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, [handleKey]);

  // ---- File handlers ----
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_PHOTOS - (visibleExisting.length + newFiles.length);
    if (files.length > remaining) {
      alert(`You can add only ${remaining} more image(s).`);
      e.target.value = "";
      return;
    }

    try {
      const compressed = await compressImages(files);
      const withPreview = compressed.map((f) =>
        Object.assign(f, { preview: URL.createObjectURL(f) })
      );
      setNewFiles((prev) => [...prev, ...withPreview]);
    } catch {
      alert("Image compression failed.");
    } finally {
      e.target.value = "";
    }
  };

  const handleRemoveExisting = (photo) => {
    setRemovedIds((prev) =>
      prev.includes(photo.photo_id)
        ? prev.filter((id) => id !== photo.photo_id)
        : [...prev, photo.photo_id]
    );
  };

  const handleRemoveNewFile = (index) => {
    const file = newFiles[index];
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ---- Toast helper ----
  const showToast = (message, type = "success") => {
    if (!toastRef.current) return;

    toastRef.current.textContent = message;
    toastRef.current.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
    toastRef.current.style.display = "block";

    setTimeout(() => {
      toastRef.current.style.display = "none";
    }, 2500);
  };

  // ---- Save Changes ----
  const handleSaveChanges = async () => {
    if (!removedIds.length && !newFiles.length) return;

    const formData = new FormData();
    formData.append("remove", JSON.stringify(removedIds));
    newFiles.forEach((f) => formData.append("photos", f));

    try {
      setIsUploading(true);
      const res = await editProductImages(product.product_id, formData);

      const updatedProduct = { ...product, photos: res.photos || [] };
      onProductRefresh && onProductRefresh(updatedProduct);

      // ✅ Toast success instead of alert
      showToast("✅ Images updated successfully!");

      // Keep modal open for preview
      resetEditState();
      setExistingPhotos(res.photos || []);
      modalRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Image update failed:", err);
      showToast("❌ Failed to update images.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  if (!product) return null;

  const { name, category_id, variants = [] } = product;
  const hasSize = variants.some((v) => v.size);
  const hasWeight = variants.some((v) => v.weight);
  const currentImage = combinedList[currentIndex]?.src ?? null;
  const totalImages = visibleExisting.length + newFiles.length;
  const disableSave = !removedIds.length && !newFiles.length;

  return (
    <>
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={styles.modalContent}>
            <div className="modal-header">
              <h5 className="modal-title" style={styles.modalTitle}>
                {editMode ? name : "Product Information"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body" style={styles.modalBody}>
              {!editMode ? (
                <>
                  <div style={styles.container}>
                    <div style={styles.imageSection}>
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt={name}
                          style={styles.mainImage}
                          onClick={() => {
                            setShowLightbox(true);
                            setCurrentIndex(0);
                          }}
                          className="modal-image-hover"
                        />
                      ) : (
                        <div style={styles.noImage}>No Image Available</div>
                      )}
                      <button
                        style={styles.editButton}
                        onClick={() => setEditMode(true)}
                      >
                        {existingPhotos.length ? "Edit Images" : "Add Images"}
                      </button>
                    </div>

                    <div style={styles.infoSection}>
                      <h4 style={styles.name}>{name}</h4>
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
                  <div style={styles.editSection}>
                    <h5 style={styles.editTitle}>
                      Edit Images ({totalImages}/{MAX_PHOTOS})
                    </h5>
                    <div style={styles.imageGrid}>
                      {visibleExisting.map((p) => (
                        <div key={p.photo_id} style={styles.imageCard}>
                          <img
                            src={p.photo_url}
                            alt="existing"
                            style={styles.imageThumb}
                          />
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
                      {totalImages < MAX_PHOTOS && (
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Lightbox --- */}
      {showLightbox && currentImage && (
        <div style={styles.lightboxOverlay} onClick={() => setShowLightbox(false)}>
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
            alt={name}
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

      {/* ✅ Toast Notification */}
      <div
        ref={toastRef}
        style={styles.toast}
      ></div>
    </>
  );
});

export default ProductInfoModal;
