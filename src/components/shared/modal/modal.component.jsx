import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal Component
 * Component in charge of wrapping the modal element.
 */
function Modal({ closeModal, children }) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current.showModal();
  }, []);

  return (
    <dialog ref={ref} onCancel={closeModal} onClose={closeModal}>
      {children}
    </dialog>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};



/**
 * Module Exports
 */
export default Modal;