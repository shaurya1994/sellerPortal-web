// FILE: ProductAddModal.jsx
import { Modal } from "bootstrap";
import { useState, useEffect, useRef, memo } from "react";

import { CATEGORY_MAP } from "../../constants/categoryMap";
import { productAddModalStyles as styles } from "./ProductAddModal.styles";

const MAX_PHOTOS = 3;

const ProductAddModal = memo(({ show, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    category_id: "",
    photos: [],
    variants: [{ size: "", weight: "" }],
    weightUnit: "GM",
  });

  // Initialize modal
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl, {
      backdrop: true,
      keyboard: true,
    });
    const handleHidden = () => {
      onClose && onClose();
      resetForm();
    };
    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [onClose]);

  useEffect(() => {
    const modal = Modal.getOrCreateInstance(modalRef.current);
    show ? modal.show() : modal.hide();
  }, [show]);

  const resetForm = () => {
    setFormState({
      name: "",
      category_id: "",
      photos: [],
      variants: [{ size: "", weight: "" }],
      weightUnit: "GM",
    });
  };

  // Text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // New toggle buttons for weight unit
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
  
  // Selecting photos
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formState.photos.length > MAX_PHOTOS) {
      window.alert(`You can upload a maximum of ${MAX_PHOTOS} photos only.`);
      e.target.value = "";
      return;
    }
    setFormState((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, MAX_PHOTOS),
    }));
  };

  // Remove photo from the selected photos
  const removePhoto = (index) => {
    setFormState((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Variant input handling
  const handleVariantChange = (index, field, value) => {
    setFormState((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  // Handles MM formatting after user finishes typing
  const handleSizeBlur = (index) => {
    setFormState((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index].size = formatFieldValue(
        newVariants[index].size,
        "size"
      );
      return { ...prev, variants: newVariants };
    });
  };

  // Handles GM/KG formatting after user finishes typing
  const handleWeightBlur = (index) => {
    setFormState((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index].weight = formatFieldValue(
        newVariants[index].weight,
        "weight",
        prev.weightUnit
      );
      return { ...prev, variants: newVariants };
    });
  };

  // Add new variant
  const addVariantRow = () => {
    const last = formState.variants[formState.variants.length - 1];
    if (!last.size && !last.weight) {
      window.alert("Please fill in the current variant before adding another.");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", weight: "" }],
    }));
  };

  // Remove variant row
  const removeVariantRow = (index) => {
    setFormState((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // Form Validations
  const validateForm = () => {
    if (!formState.name.trim() || !formState.category_id) {
      window.alert("Product name and category are required.");
      return false;
    }
    const invalidVariant = formState.variants.some(
      (v) => !v.size && !v.weight
    );
    if (invalidVariant) {
      window.alert("Each variant must have at least size or weight filled.");
      return false;
    }
    return true;
  };

  // Generic field formatter for MM / GM / KG
  const formatFieldValue = (value, type, unit = "") => {
    const clean = value?.trim() || "";
    if (!clean) return "";

    if (type === "size") {
      const match = clean.match(/^(\d+)\s*(mm)?$/i);
      if (match) return `${match[1]} MM`;
      return clean;
    }

    if (type === "weight") {
      const match = clean.match(/^(\d+)\s*(gm|kg)?$/i);
      if (match) return `${match[1]} ${unit}`.trim();
      return clean;
    }

    return clean;
  };

  // POST request on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Format both size and weight fields before POST
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
      const resp = await fetch("http://localhost:5000/seller/add-product", {
        method: "POST",
        body: payload,
      });
      const result = await resp.json();

      if (resp.ok) {
        onSubmit && onSubmit(result);
      } else {
        window.alert(result?.message || "Failed to add product.");
      }
    } catch (err) {
      window.alert("Network error. Please try again.");
    }
  };

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
                <label htmlFor="name" style={styles.label}>Product Name
                </label>
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
                <label htmlFor="category_id" style={styles.label}>Category
                </label>
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
                <label style={styles.label}>Upload Photos (Maximum 3)
                </label>
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
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            style={styles.photoThumb}
                          />
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
                  <label style={styles.label}>Variants
                  </label>
                  <span style={styles.noteText}>
                    Keep size as <b>‘Regular’</b> if there is only one size
                  </span>

                  {/* ✅ Toggle buttons */}
                  <div style={styles.unitToggleContainer}>
                    {["GM", "KG"].map((unit) => (
                      <button
                        type="button"
                        key={unit}
                        onClick={() => handleUnitSelect(unit)}
                        style={{
                          ...styles.unitToggleButton,
                          ...(formState.weightUnit === unit
                            ? styles.unitToggleActive
                            : {}),
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
                      onChange={(e) =>handleVariantChange(idx, "weight", e.target.value)}
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

                <button
                  type="button"
                  onClick={addVariantRow}
                  style={styles.addVariantBtn}
                >
                  + Add Variant
                </button>
              </div>

              {/* Submit */}
              <div style={styles.formGroup}>
                <button type="submit" style={styles.submitBtn}>
                  Submit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductAddModal;
