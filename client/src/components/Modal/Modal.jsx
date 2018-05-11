import React from 'react';
import "./Modal.css"


 class Modal extends React.Component {
render() {
      if (props.isOpen === false){
      return null
      } else {
  return (

    // <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"></h5>
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
}
}

export default Modal;
