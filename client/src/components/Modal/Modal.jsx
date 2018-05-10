import React from 'react';
import "./Modal.css"

const Modal = props => {
  return (

    // <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{props.value.modalMessage}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClose={props.onClose}>Close</button>
          </div>
        </div>
        // </div>

  )
}

export default Modal;
