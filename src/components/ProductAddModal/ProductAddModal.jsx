// FILE: ProductAddModal.jsx
import { useState, useEffect, useRef, memo } from "react";
import { Modal } from "bootstrap";
import { productAddModalStyles as styles } from "./ProductAddModal.styles";
import { CATEGORY_MAP } from "../../constants/categoryMap"; // ✅ import category map

const ProductAddModal = memo(({ show, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    category_id: "",
    photos: [],
    variants: [{ size: "", weight: "" }],
  });

  // Bootstrap modal setup
  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl, {
      backdrop: true,
      keyboard: true,
    });
    const handleHidden = () => {
      onClose && onClose();
      setFormState({
        name: "",
        category_id: "",
        photos: [],
        variants: [{ size: "", weight: "" }],
      });
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

  // Input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Photo selection
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState((prev) => ({
      ...prev,
      photos: files.slice(0, 3), // ✅ limit to 3
    }));
  };

  const removePhoto = (index) => {
    setFormState((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Variant logic
  const handleVariantChange = (index, field, value) => {
    setFormState((prev) => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const addVariantRow = () => {
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formState.name);
    payload.append("category_id", formState.category_id); // ✅ correct ID value
    formState.photos.forEach((file) => payload.append("photos", file));
    payload.append("variants", JSON.stringify(formState.variants));

    try {
      const resp = await fetch("http://localhost:5000/seller/add-product", {
        method: "POST",
        body: payload,
      });
      const result = await resp.json();

      if (resp.ok) {
        onSubmit && onSubmit(result);
      } else {
        console.error("Add product failed", result);
      }
    } catch (err) {
      console.error("Network error", err);
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
            <h5
              className="modal-title"
              id="productAddModalLabel"
              style={styles.title}
            >
              Add New Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body" style={styles.modalBody}>
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* ✅ Product Name */}
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Product Name
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

              {/* ✅ Category - Dynamic from CATEGORY_MAP */}
              <div style={styles.formGroup}>
                <label htmlFor="category_id" style={styles.label}>
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formState.category_id}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Category</option>
                  {Object.entries(CATEGORY_MAP).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Photos (max 3) */}
              <div style={styles.formGroup}>
                <label htmlFor="photos" style={styles.label}>
                  Upload Photos (up to 3)
                </label>
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  style={styles.input}
                />
                {formState.photos.length > 0 && (
                  <ul style={styles.photoPreviewList}>
                    {formState.photos.map((file, idx) => (
                      <li key={idx} style={styles.photoPreviewItem}>
                        {file.name}
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          style={styles.photoRemoveBtn}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ✅ Variants */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Variants</label>
                {formState.variants.map((variant, idx) => (
                  <div key={idx} style={styles.variantRow}>
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) =>
                        handleVariantChange(idx, "size", e.target.value)
                      }
                      style={styles.variantInput}
                    />
                    <input
                      type="text"
                      placeholder="Weight"
                      value={variant.weight}
                      onChange={(e) =>
                        handleVariantChange(idx, "weight", e.target.value)
                      }
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
                  Add Variant
                </button>
              </div>

              {/* ✅ Submit */}
              <div style={styles.formGroup}>
                <button type="submit" style={styles.submitBtn}>
                  Submit
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

// // FILE: ProductAddModal.jsx
// import { useState, useEffect, useRef, memo } from "react";
// import { Modal } from "bootstrap";
// import { productAddModalStyles as styles } from "./ProductAddModal.styles";

// const ProductAddModal = memo(({ show, onClose, onSubmit }) => {
//   const modalRef = useRef(null);
//   const [formState, setFormState] = useState({
//     name: "",
//     category_id: "",
//     photos: [],             // array of File objects or URL placeholders
//     variants: [             // initial one variant row
//       { size: "", weight: "" }
//     ]
//   });

//   // Bootstrap modal instance
//   useEffect(() => {
//     const modalEl = modalRef.current;
//     if (!modalEl) return;
//     const modal = Modal.getOrCreateInstance(modalEl, {
//       backdrop: true,
//       keyboard: true,
//     });
//     const handleHidden = () => {
//       // Clear/reset form when hidden
//       onClose && onClose();
//       setFormState({
//         name: "",
//         category_id: "",
//         photos: [],
//         variants: [{ size: "", weight: "" }]
//       });
//     };
//     modalEl.addEventListener("hidden.bs.modal", handleHidden);
//     return () => {
//       modalEl.removeEventListener("hidden.bs.modal", handleHidden);
//     };
//   }, [onClose]);

//   useEffect(() => {
//     const modalEl = modalRef.current;
//     if (!modalEl) return;
//     const modal = Modal.getOrCreateInstance(modalEl);
//     show ? modal.show() : modal.hide();
//   }, [show]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle photo selection
//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);
//     // limit to 3
//     const allowed = files.slice(0, 3);
//     setFormState(prev => ({
//       ...prev,
//       photos: allowed
//     }));
//   };

//   // Remove photo by index
//   const removePhoto = (index) => {
//     setFormState(prev => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index)
//     }));
//   };

//   // Handle variant row change
//   const handleVariantChange = (index, field, value) => {
//     setFormState(prev => {
//       const newVariants = [...prev.variants];
//       newVariants[index] = {
//         ...newVariants[index],
//         [field]: value
//       };
//       return { ...prev, variants: newVariants };
//     });
//   };

//   // Add a new variant row
//   const addVariantRow = () => {
//     setFormState(prev => ({
//       ...prev,
//       variants: [...prev.variants, { size: "", weight: "" }]
//     }));
//   };

//   // Remove variant row (if more than one)
//   const removeVariantRow = (index) => {
//     setFormState(prev => ({
//       ...prev,
//       variants: prev.variants.filter((_, i) => i !== index)
//     }));
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // prepare form data for POST
//     const payload = new FormData();
//     payload.append("name", formState.name);
//     payload.append("category_id", formState.category_id);
//     formState.photos.forEach((file, idx) => {
//       payload.append("photos", file);
//     });
//     // Append variants JSON
//     payload.append("variants", JSON.stringify(formState.variants));

//     try {
//       const resp = await fetch("http://localhost:5000/seller/add-product", {
//         method: "POST",
//         body: payload
//       });
//       const result = await resp.json();
//       if (resp.ok) {
//         onSubmit && onSubmit(result);
//       } else {
//         console.error("Add product failed", result);
//         // handle error UI
//       }
//     } catch (err) {
//       console.error("Network error", err);
//       // handle error UI
//     }
//   };

//   return (
//     <div
//       className="modal fade"
//       ref={modalRef}
//       tabIndex="-1"
//       aria-labelledby="productAddModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content" style={styles.modalContent}>
//           <div className="modal-header">
//             <h5
//               className="modal-title"
//               id="productAddModalLabel"
//               style={styles.title}
//             >
//               Add New Product
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             />
//           </div>
//           <div className="modal-body" style={styles.modalBody}>
//             <form onSubmit={handleSubmit} style={styles.form}>
//               {/* Name */}
//               <div style={styles.formGroup}>
//                 <label htmlFor="name" style={styles.label}>Product Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formState.name}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               {/* Category */}
//               <div style={styles.formGroup}>
//                 <label htmlFor="category_id" style={styles.label}>Category</label>
//                 <select
//                   id="category_id"
//                   name="category_id"
//                   value={formState.category_id}
//                   onChange={handleInputChange}
//                   style={styles.input}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {/* You would map your category constants here */}
//                   <option value="1">Mortise Lock</option>
//                   <option value="2">Main Door Handle</option>
//                   {/* … all categories */}
//                 </select>
//               </div>

//               {/* Photos */}
//               <div style={styles.formGroup}>
//                 <label htmlFor="photos" style={styles.label}>
//                   Upload Photos (up to 3)
//                 </label>
//                 <input
//                   type="file"
//                   id="photos"
//                   name="photos"
//                   accept="image/*"
//                   multiple
//                   onChange={handlePhotoChange}
//                   style={styles.input}
//                 />
//                 {formState.photos.length > 0 && (
//                   <ul style={styles.photoPreviewList}>
//                     {formState.photos.map((file, idx) => (
//                       <li key={idx} style={styles.photoPreviewItem}>
//                         {file.name}
//                         <button
//                           type="button"
//                           onClick={() => removePhoto(idx)}
//                           style={styles.photoRemoveBtn}
//                         >
//                           ×
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* Variants */}
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Variants</label>
//                 {formState.variants.map((variant, idx) => (
//                   <div key={idx} style={styles.variantRow}>
//                     <input
//                       type="text"
//                       placeholder="Size"
//                       value={variant.size}
//                       onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
//                       style={styles.variantInput}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Weight"
//                       value={variant.weight}
//                       onChange={(e) => handleVariantChange(idx, "weight", e.target.value)}
//                       style={styles.variantInput}
//                     />
//                     {formState.variants.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeVariantRow(idx)}
//                         style={styles.variantRemoveBtn}
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addVariantRow}
//                   style={styles.addVariantBtn}
//                 >
//                   Add Variant
//                 </button>
//               </div>

//               {/* Submit */}
//               <div style={styles.formGroup}>
//                 <button type="submit" style={styles.submitBtn}>
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ProductAddModal;
