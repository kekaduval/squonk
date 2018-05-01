import React from 'react';
import "./AddBillButton.css"

const AddBillButton = props => {

  return (
  <div className=''>
    <button className=" btn btn-primary " title="Add Bill" onClick={props.onClick}>+
  </button>
  </div>
  )
}

export default AddBillButton;

