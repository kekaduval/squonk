import React from 'react';
import "./AddBillButton.css"

const AddBillButton = props => (
  <div className='container'>
    <button className=" btn btn-primary" title="Add Bill" onClick={props.onClick}>Add Bill
  </button>
  </div>
)

export default AddBillButton;

