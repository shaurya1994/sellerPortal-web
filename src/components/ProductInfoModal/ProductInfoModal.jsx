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

  const [editMode, setEditMode] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // ---- Modal setup ----
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl, { backdrop: true, keyboard: true });
    const handleHidden = () => {
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

      alert("✅ Images updated successfully");

      // ✅ Close modal programmatically
      const modalEl = modalRef.current;
      const modalInstance = Modal.getInstance(modalEl);
      modalInstance?.hide();

      resetEditState();
    } catch (err) {
      console.error("Image update failed:", err);
      alert("❌ Failed to update images.");
    } finally {
      setIsUploading(false);
    }
    
    // try {
    //   setIsUploading(true);
    //   const res = await editProductImages(product.product_id, formData);

    //   console.log("🟢 editProductImages response:", res); // DEBUG
    //   console.log("🟢 Updated photos received:", res.photos);

    //   // Check if photo URLs are absolute and valid
    //   if (!res.photos || !Array.isArray(res.photos) || res.photos.length === 0) {
    //     console.warn("⚠️ No updated photos received from backend");
    //   } else {
    //     res.photos.forEach((p, i) =>
    //       console.log(`Photo ${i + 1}:`, p.photo_url)
    //     );
    //   }

    //   // Update modal and parent state
    //   setExistingPhotos(res.photos || []);
    //   if (onProductRefresh) {
    //     const updatedProduct = { ...product, photos: res.photos };
    //     console.log("🟢 Passing updated product to parent:", updatedProduct);
    //     onProductRefresh(updatedProduct);
    //   }

    //   alert("✅ Images updated successfully!");
    //   resetEditState();

    //   // Close modal
    //   const modalEl = modalRef.current;
    //   const modalInstance = Modal.getInstance(modalEl);
    //   modalInstance?.hide();

    // } catch (err) {
    //   console.error("❌ editProductImages error:", err);
    //   alert("❌ Failed to update images.");
    // } finally {
    //   setIsUploading(false);
    // }

  };

  if (!product) return null;

  const { name, category_id, variants = [] } = product;
  const hasSize = variants.some((v) => v.size);
  const hasWeight = variants.some((v) => v.weight);
  const currentImage = combinedList[currentIndex]?.src ?? null;
  const totalImages = visibleExisting.length + newFiles.length;
  const disableSave = !removedIds.length && !newFiles.length;

  return (
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
                {/* --- View Mode --- */}
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

                {/* ✅ Scoped hover + table (restored effects) */}
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
                {/* --- Edit Mode --- */}
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

      {/* --- Lightbox --- */}
      {showLightbox && currentImage && (
        <div
          style={styles.lightboxOverlay}
          onClick={() => setShowLightbox(false)}
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
    </div>
  );
});

export default ProductInfoModal;

// import { Modal } from "bootstrap";
// import { useEffect, useRef, useState, useCallback, memo } from "react";

// import { editProductImages } from "../../api/products";
// import { getCategoryName } from "../../constants/categoryMap";
// import { compressImages } from "../../utils/imageCompressor";

// import { productInfoModalStyles as styles } from "./ProductInfoModal.styles";

// const MAX_PHOTOS = 3;

// const ProductInfoModal = memo(({ show, onClose, product, onProductRefresh }) => {
//   const modalRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [editMode, setEditMode] = useState(false);
//   const [existingPhotos, setExistingPhotos] = useState([]);
//   const [removedIds, setRemovedIds] = useState([]);
//   const [newFiles, setNewFiles] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showLightbox, setShowLightbox] = useState(false);

//   // ----- Modal setup -----
//   useEffect(() => {
//     const modalEl = modalRef.current;
//     if (!modalEl) return;
//     const modal = Modal.getOrCreateInstance(modalEl, { backdrop: true, keyboard: true });
//     const handleHidden = () => {
//       onClose && onClose();
//       resetEditState();
//     };
//     modalEl.addEventListener("hidden.bs.modal", handleHidden);
//     return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
//   }, [onClose]);

//   useEffect(() => {
//     const modalEl = modalRef.current;
//     if (!modalEl) return;
//     const modal = Modal.getOrCreateInstance(modalEl);
//     show ? modal.show() : modal.hide();
//   }, [show]);

//   useEffect(() => {
//     if (product?.photos) setExistingPhotos(product.photos);
//   }, [product]);

//   const resetEditState = () => {
//     setEditMode(false);
//     setRemovedIds([]);
//     newFiles.forEach((f) => URL.revokeObjectURL(f.preview));
//     setNewFiles([]);
//   };

//   // Lightbox handlers
//   const handleNext = useCallback(() => {
//     if (!existingPhotos.length && newFiles.length === 0) return;
//     // build combined list length
//     const len = (existingPhotos.length - removedIds.length) + newFiles.length;
//     setCurrentIndex((i) => (i + 1) % Math.max(1, len));
//   }, [existingPhotos, removedIds, newFiles.length]);

//   const handlePrev = useCallback(() => {
//     if (!existingPhotos.length && newFiles.length === 0) return;
//     const len = (existingPhotos.length - removedIds.length) + newFiles.length;
//     setCurrentIndex((i) => (i - 1 + Math.max(1, len)) % Math.max(1, len));
//   }, [existingPhotos, removedIds, newFiles.length]);

//   const handleKey = useCallback(
//     (e) => {
//       // If lightbox is open, intercept keys and stop propagation so bootstrap modal doesn't close
//       if (showLightbox) {
//         if (e.key === "ArrowRight") {
//           e.stopPropagation();
//           e.preventDefault();
//           handleNext();
//           return;
//         }
//         if (e.key === "ArrowLeft") {
//           e.stopPropagation();
//           e.preventDefault();
//           handlePrev();
//           return;
//         }
//         if (e.key === "Escape") {
//           // IMPORTANT: prevent Bootstrap modal from receiving this Escape
//           e.stopPropagation();
//           e.preventDefault();
//           setShowLightbox(false);
//           return;
//         }
//       }
//       // otherwise do nothing here (let bootstrap/modal handle keys)
//     },
//     [showLightbox, handleNext, handlePrev]
//   );

//   useEffect(() => {
//     document.addEventListener("keydown", handleKey, true); // capture phase to intercept before bootstrap
//     return () => document.removeEventListener("keydown", handleKey, true);
//   }, [handleKey]);

//   // ---- Edit mode handlers ----
//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     const remaining = MAX_PHOTOS - (existingPhotos.length - removedIds.length + newFiles.length);
//     if (files.length > remaining) {
//       alert(`You can add only ${remaining} more image(s).`);
//       e.target.value = "";
//       return;
//     }

//     try {
//       const compressed = await compressImages(files);
//       const withPreview = compressed.map((f) => Object.assign(f, { preview: URL.createObjectURL(f) }));
//       setNewFiles((prev) => [...prev, ...withPreview]);
//     } catch {
//       alert("Image compression failed.");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleRemoveExisting = (photo) => {
//     // use photo.photo_url as stable identifier; avoid duplicates
//     setRemovedIds((prev) => (prev.includes(photo.photo_url) ? prev : [...prev, photo.photo_url]));
//   };

//   const handleRemoveNewFile = (index) => {
//     URL.revokeObjectURL(newFiles[index].preview);
//     setNewFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSaveChanges = async () => {
//     if (!removedIds.length && !newFiles.length) return;

//     const formData = new FormData();
//     formData.append("remove", JSON.stringify(removedIds));
//     newFiles.forEach((f) => formData.append("photos", f));

//     try {
//       setIsUploading(true);
//       const res = await editProductImages(product.product_id, formData);
//       setExistingPhotos(res.photos || []);
//       onProductRefresh && onProductRefresh({ ...product, photos: res.photos });
//       alert("✅ Images updated successfully!");
//       resetEditState();
//     } catch {
//       alert("❌ Failed to update images.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   if (!product) return null;

//   const { name, category_id, variants = [] } = product;
//   const hasSize = variants.some((v) => v.size);
//   const hasWeight = variants.some((v) => v.weight);

//   // currentImage: prefer existing (not removed) then newFiles previews
//   const visibleExisting = existingPhotos.filter((p) => !removedIds.includes(p.photo_url));
//   const combinedPreviewList = [
//     ...visibleExisting.map((p) => ({ type: "existing", photo_url: p.photo_url })),
//     ...newFiles.map((f) => ({ type: "new", photo_url: f.preview })),
//   ];
//   const currentImage = combinedPreviewList[currentIndex]?.photo_url ?? null;

//   const totalImages = visibleExisting.length + newFiles.length;
//   const disableSave = !removedIds.length && !newFiles.length;

//   return (
//     <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content" style={styles.modalContent}>
//           <div className="modal-header">
//             {/* <-- SHOW product name (if present) instead of generic title */}
//             <h5 className="modal-title" style={styles.modalTitle}>
//               {editMode ? name : "Product Information"}
//             </h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" />
//           </div>

//           <div className="modal-body" style={styles.modalBody}>
//             {!editMode ? (
//               <>
//                 {/* --- View Mode --- */}
//                 <div style={styles.container}>
//                   <div style={styles.imageSection}>
//                     {currentImage ? (
//                       <img
//                         src={currentImage}
//                         alt={name}
//                         style={styles.mainImage}
//                         onClick={() => {
//                           setShowLightbox(true);
//                           // set current index to the position of the clicked image in combined list
//                           // find index of first visibleExisting or newFiles (we show first image)
//                           setCurrentIndex(0);
//                         }}
//                         className="modal-image-hover"
//                       />
//                     ) : (
//                       <div style={styles.noImage}>No Image Available</div>
//                     )}
//                     <button style={styles.editButton} onClick={() => setEditMode(true)}>
//                       {existingPhotos.length ? "Edit Images" : "Add Images"}
//                     </button>
//                   </div>

//                   <div style={styles.infoSection}>
//                     <h4 style={styles.name}>{name}</h4>
//                     <p style={styles.category}>{getCategoryName(category_id)}</p>

//                     <table style={styles.table}>
//                       <thead>
//                         <tr>
//                           {hasSize && <th>Size</th>}
//                           {hasWeight && <th>Weight</th>}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {variants.map((v, i) => (
//                           <tr key={i}>
//                             {hasSize && <td>{v.size || "-"}</td>}
//                             {hasWeight && <td>{v.weight || "-"}</td>}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

                // {/* Scoped hover + table (restored effects) */}
                // <style>
                //   {`
                //     .modal-image-hover:hover {
                //       transform: scale(1.05);
                //       box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                //       transition: transform 0.3s ease, box-shadow 0.3s ease;
                //     }
                //     table {
                //       border-collapse: collapse;
                //       margin-top: 8px;
                //       width: 100%;
                //     }
                //     table th, table td {
                //       border: 1px solid #ddd;
                //       padding: 8px 12px;
                //       text-align: center;
                //     }
                //     table th {
                //       background-color: #f5f5f5;
                //       font-weight: 600;
                //     }
                //     table tr:nth-child(even) { background-color: #fafafa; }
                //     table tr:hover { background-color: #f1f1f1; }
                //   `}
                // </style>
//               </>
//             ) : (
//               <>
//                 {/* --- Edit Mode (gray-section) --- */}
//                 <div style={styles.editSection}>
//                   <h5 style={styles.editTitle}>Edit Images ({totalImages}/{MAX_PHOTOS})</h5>
//                   <div style={styles.imageGrid}>
//                     {visibleExisting.map((p) => (
//                       <div key={p.photo_url} style={styles.imageCard}>
//                         <img src={p.photo_url} alt="existing" style={styles.imageThumb} />
//                         <button style={styles.removeBtn} onClick={() => handleRemoveExisting(p)}>
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                     {newFiles.map((f, i) => (
//                       <div key={i} style={styles.imageCard}>
//                         <img src={f.preview} alt="new" style={styles.imageThumb} />
//                         <button style={styles.removeBtn} onClick={() => handleRemoveNewFile(i)}>
//                           ×
//                         </button>
//                       </div>
//                     ))}

//                     {totalImages < MAX_PHOTOS && (
//                       <div style={styles.addCard} onClick={() => fileInputRef.current.click()}>
//                         <div style={styles.addSymbol}>＋</div>
//                         <div style={styles.addText}>Add Image</div>
//                       </div>
//                     )}
//                   </div>

//                   <div style={styles.actionRow}>
//                     <button style={styles.cancelBtn} onClick={resetEditState} disabled={isUploading}>Cancel</button>
//                     <button
//                       style={{ ...styles.saveBtn, opacity: disableSave || isUploading ? 0.6 : 1 }}
//                       onClick={handleSaveChanges}
//                       disabled={disableSave || isUploading}
//                     >
//                       {isUploading ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- Lightbox --- */}
//       {showLightbox && currentImage && (
//         <div style={styles.lightboxOverlay} onClick={() => setShowLightbox(false)}>
//           {combinedPreviewList.length > 1 && (
//             <button style={{ ...styles.arrowBtn, left: "20px" }} onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
//               ‹
//             </button>
//           )}
//           <img src={currentImage} alt={name} style={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
//           {combinedPreviewList.length > 1 && (
//             <button style={{ ...styles.arrowBtn, right: "20px" }} onClick={(e) => { e.stopPropagation(); handleNext(); }}>
//               ›
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// export default ProductInfoModal;
