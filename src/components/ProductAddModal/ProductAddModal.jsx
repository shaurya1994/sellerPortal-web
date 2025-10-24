// FILE: src/components/ProductAddModal/ProductAddModal.jsx
import { Modal } from "bootstrap";
import { useState, useEffect, useRef, memo } from "react";

import { productAddModalStyles as styles } from "./ProductAddModal.styles";
import { CATEGORY_MAP } from "../../constants/categoryMap";
import { compressImages } from "../../utils/imageCompressor";
import ToastBanner from "../ToastBanner/ToastBanner";
import { addSellerProduct } from "../../api/products";

const MAX_PHOTOS = 3;

const ProductAddModal = memo(({ show, onClose, onSubmit }) => {
  const modalRef = useRef(null);

  // --- STATE ---
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [submitHover, setSubmitHover] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formState, setFormState] = useState({
    name: "",
    category_id: "",
    photos: [],
    variants: [{ size: "", weight: "" }],
    weightUnit: "GM",
  });

  // --- HELPERS ---
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      category_id: "",
      photos: [],
      variants: [{ size: "", weight: "" }],
      weightUnit: "GM",
    });
  };

  // --- MODAL SETUP ---
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl, { backdrop: true, keyboard: true });
    const handleHidden = () => {
      onClose?.();
      resetForm();
    };
    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [onClose]);

  useEffect(() => {
    const modal = Modal.getOrCreateInstance(modalRef.current);
    show ? modal.show() : modal.hide();
  }, [show]);

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnitSelect = (unit) => {
    setFormState((prev) => ({
      ...prev,
      weightUnit: unit,
      variants: prev.variants.map((v) => ({
        ...v,
        weight: v.weight ? v.weight.replace(/(GM|KG)$/i, unit) : "",
      })),
    }));
  };

  // --- PHOTOS ---
  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_PHOTOS - formState.photos.length;

    if (files.length > remainingSlots) {
      alert(`You can upload a maximum of ${MAX_PHOTOS} photos only.`);
      e.target.value = "";
      return;
    }

    try {
      setIsCompressing(true);
      const compressed = await compressImages(files);
      setFormState((prev) => ({
        ...prev,
        photos: [...prev.photos, ...compressed].slice(0, MAX_PHOTOS),
      }));
    } catch {
      alert("Image compression failed. Please try again.");
    } finally {
      setIsCompressing(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index) => {
    setFormState((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // --- VARIANTS ---
  const handleVariantChange = (index, field, value) => {
    setFormState((prev) => {
      const variants = [...prev.variants];
      variants[index] = { ...variants[index], [field]: value };
      return { ...prev, variants };
    });
  };

  const addVariantRow = () => {
    const last = formState.variants[formState.variants.length - 1];
    if (!last.size && !last.weight) {
      alert("Please fill in the current variant before adding another.");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", weight: "" }],
    }));
  };

  const removeVariantRow = (index) => {
    setFormState((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // --- FIELD FORMATTING (Fixed Decimal Support) ---
  const formatFieldValue = (value, type, unit = "") => {
    const clean = value?.trim() || "";
    if (!clean) return "";

    if (type === "size") {
      const match = clean.match(/^(\d+(\.\d+)?)\s*(mm)?$/i);
      return match ? `${match[1]} MM` : clean;
    }

    
    if (type === "weight") {
      const match = clean.match(/^(\d*\.?\d+)\s*(gm|kg)?$/i);
      return match ? `${match[1]} ${unit}`.trim() : clean;
    }


    return clean;
  };

  const handleSizeBlur = (i) => {
    setFormState((prev) => {
      const variants = [...prev.variants];
      variants[i].size = formatFieldValue(variants[i].size, "size");
      return { ...prev, variants };
    });
  };

  const handleWeightBlur = (i) => {
    setFormState((prev) => {
      const variants = [...prev.variants];
      variants[i].weight = formatFieldValue(variants[i].weight, "weight", prev.weightUnit);
      return { ...prev, variants };
    });
  };

  // --- VALIDATION ---
  const validateForm = () => {
    if (!formState.name.trim() || !formState.category_id) {
      alert("Product name and category are required.");
      return false;
    }
    const invalid = formState.variants.some((v) => !v.size && !v.weight);
    if (invalid) {
      alert("Each variant must have at least size or weight filled.");
      return false;
    }
    return true;
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedVariants = formState.variants.map((v) => ({
      ...v,
      size: formatFieldValue(v.size, "size"),
      weight: formatFieldValue(v.weight, "weight", formState.weightUnit),
    }));

    const payload = new FormData();
    payload.append("name", formState.name);
    payload.append("category_id", formState.category_id);
    formState.photos.forEach((file) => payload.append("photos", file));
    payload.append("variants", JSON.stringify(formattedVariants));

    try {
      const result = await addSellerProduct(payload);
      showToast("✅ Product added successfully!");
      onSubmit?.(result);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "❌ Failed to add product. Please try again.");
    }
  };

  // --- RENDER ---
  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="productAddModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header">
            <h5 className="modal-title" id="productAddModalLabel" style={styles.title}>
              Add New Product
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body" style={styles.modalBody}>
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Product Name */}
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              {/* Category */}
              <div style={styles.formGroup}>
                <label htmlFor="category_id" style={styles.label}>Category</label>
                <div style={styles.customSelectWrapper}>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formState.category_id}
                    onChange={handleInputChange}
                    style={styles.customSelect}
                    required
                  >
                    <option value="">Select Category</option>
                    {Object.entries(CATEGORY_MAP).map(([id, label]) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                  <span style={styles.dropdownArrow}>▼</span>
                </div>
              </div>

              {/* Photos */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Photos (Maximum 3)</label>
                <div style={styles.photoRow}>
                  <label htmlFor="photos" style={styles.browseButton}>
                    Browse…
                    <input
                      type="file"
                      id="photos"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoChange}
                      style={styles.hiddenInput}
                    />
                  </label>

                  {isCompressing && (
                    <div style={{ color: "#666", fontSize: "0.9rem" }}>
                      Compressing images…
                    </div>
                  )}

                  {formState.photos.length > 0 && (
                    <div style={styles.photoGridInline}>
                      {formState.photos.map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...styles.photoBox,
                            ...(hoveredIndex === idx ? styles.photoBoxHover : {}),
                          }}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <img src={URL.createObjectURL(file)} alt="Preview" style={styles.photoThumb} />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            style={styles.photoRemoveCross}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Variants */}
              <div style={styles.formGroup}>
                <div style={styles.variantHeaderRow}>
                  <label style={styles.label}>Variants</label>
                  <span style={styles.noteText}>Keep size as <b>‘Regular’</b> if there is only one size</span>
                  <div style={styles.unitToggleContainer}>
                    {["GM", "KG"].map((unit) => (
                      <button
                        type="button"
                        key={unit}
                        onClick={() => handleUnitSelect(unit)}
                        style={{
                          ...styles.unitToggleButton,
                          ...(formState.weightUnit === unit ? styles.unitToggleActive : {}),
                        }}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                {formState.variants.map((variant, idx) => (
                  <div key={idx} style={styles.variantRow}>
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
                      onBlur={() => handleSizeBlur(idx)}
                      style={styles.variantInput}
                    />
                    <input
                      type="text"
                      placeholder="Weight"
                      value={variant.weight}
                      onChange={(e) => handleVariantChange(idx, "weight", e.target.value)}
                      onBlur={() => handleWeightBlur(idx)}
                      style={styles.variantInput}
                    />
                    {formState.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariantRow(idx)}
                        style={styles.variantRemoveBtn}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button type="button" onClick={addVariantRow} style={styles.addVariantBtn}>
                  + Add Variant
                </button>
              </div>

              {/* Submit */}
              <div style={styles.formGroup}>
                <button
                  type="submit"
                  style={{
                    ...styles.submitBtn,
                    ...(submitHover ? styles.submitBtnHover : {}),
                  }}
                  onMouseEnter={() => setSubmitHover(true)}
                  onMouseLeave={() => setSubmitHover(false)}
                >
                  Submit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Banner */}
      <ToastBanner message={toastMessage} type="success" />
    </div>
  );
});

export default ProductAddModal;
