import React from 'react';
import "./BillsDisplayItem.css"

const BillDisplayItem = props => {

  return (
    <div className='row rowMargin'>
      <div className='col-md-2 text-center rowBG'><h5>{props.bill.billName}</h5></div>
      <div className='col-md-2 text-center rowBG'><h5>${props.bill.billPlannedAmount.toFixed(2)}</h5></div>
      <div className='col-md-2 text-center rowBG'><h5>${props.bill.billActualAmount.toFixed(2)}</h5></div>
      <div className='col-md-1 text-center rowBG'><h5>{props.bill.billStatic}</h5></div>
      <div className='col-md-2 text-center rowBG'><h5>Edit/Delete</h5></div>
    </div>
  )
}


export default BillDisplayItem;

