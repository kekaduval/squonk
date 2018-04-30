import React from 'react';
import "./AddBillButton.css"

const AddBillButton = props => (
  <div className=''>
    <button className=" btn btn-primary marginBottom" title="Add Bill" onClick={props.onClick}>Add Bill
  </button>
  </div>
)

export default AddBillButton;

