import React from 'react';
import "./AddBillButton.css"

const AddBillButton = props => {

  return (
  <div className=''>
    <button className=" btn btn-primary marginBottom" title="Add Bill" onClick={props.onClick}>Add Bill to Budget
  </button>
  </div>
  )
}

export default AddBillButton;

