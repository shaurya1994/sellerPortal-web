// FILE: ProductInfoModal.jsx
import { Modal } from "bootstrap";
import { useEffect, useRef, memo } from "react";

import { productInfoModalStyles } from "./ProductInfoModal.styles";
import ProductInfoContainer from "../ProductInfoContainer/ProductInfoContainer";

import { COLORS } from "../../constants/colors";

const ProductInfoModal = memo(({ show, onClose, product }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    // Always get or create modal instance
    const modal = Modal.getOrCreateInstance(modalEl, {
      backdrop: true,
      keyboard: true,
    });

    const handleHidden = () => onClose && onClose();
    modalEl.addEventListener("hidden.bs.modal", handleHidden);

    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [onClose]);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    const modal = Modal.getOrCreateInstance(modalEl);
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
            <h5
              className="modal-title"
              id="productInfoModalLabel"
              style={{
                margin: 0,
                fontSize: "1.35rem",
                fontWeight: 700,
                color: COLORS.text,
                lineHeight: 1.15,
                position: "relative",
              }}
            >
              Product Information
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
