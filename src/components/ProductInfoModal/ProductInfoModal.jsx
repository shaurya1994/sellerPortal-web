// FILE: ProductInfoModal.jsx
import { Modal } from "bootstrap";
import { useEffect, useRef, memo } from "react";

import { productInfoModalStyles } from "./ProductInfoModal.styles";
import ProductInfoContainer from "../ProductInfoContainer/ProductInfoContainer";

const ProductInfoModal = memo(({ show, onClose, product }) => {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    // Initialize Bootstrap modal
    if (!modalInstanceRef.current) {
      const modal = new Modal(modalEl, {
        backdrop: true, // ✅ allows click outside to close
        keyboard: true,
      });
      modalInstanceRef.current = modal;

      modalEl.addEventListener("hidden.bs.modal", onClose);
    }

    return () => {
      const modalEl = modalRef.current;
      if (modalEl) modalEl.removeEventListener("hidden.bs.modal", onClose);
    };
  }, [onClose]);

  useEffect(() => {
    const modal = modalInstanceRef.current;
    if (!modal) return;
    show ? modal.show() : modal.hide();
  }, [show]);

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="productInfoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content" style={productInfoModalStyles.modalContent}>
          <div className="modal-header">
            <h5 className="modal-title" id="productInfoModalLabel">
              {product ? product.name : "Product Information"}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body" style={productInfoModalStyles.modalBody}>
            {product ? (
              <ProductInfoContainer product={product} />
            ) : (
              <p>No product selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductInfoModal;

// import { useEffect, useRef, memo } from "react";
// import { Modal } from "bootstrap";
// import { productInfoModalStyles } from "./ProductInfoModal.styles";

// const ProductInfoModal = memo(({ show, onClose, product }) => {
//   const modalRef = useRef(null);
//   const modalInstanceRef = useRef(null);

//   useEffect(() => {
//     const modalEl = modalRef.current;
//     if (!modalEl) return;
//     if (!modalInstanceRef.current) {
//       const modal = new Modal(modalEl, { backdrop: "static", keyboard: true });
//       modalInstanceRef.current = modal;
//       modalEl.addEventListener("hidden.bs.modal", onClose);
//     }
//   }, [onClose]);

//   useEffect(() => {
//     const modal = modalInstanceRef.current;
//     if (!modal) return;
//     show ? modal.show() : modal.hide();
//   }, [show]);

//   return (
//     <div
//       className="modal fade"
//       ref={modalRef}
//       tabIndex="-1"
//       aria-labelledby="productInfoModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content" style={productInfoModalStyles.modalContent}>
//           <div className="modal-header">
//             <h5 className="modal-title" id="productInfoModalLabel">
//               {product ? product.name : "Product Information"}
//             </h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" />
//           </div>
//           <div className="modal-body">
//             {product ? JSON.stringify(product, null, 2) : "No product selected"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ProductInfoModal;
