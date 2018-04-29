import React from 'react';
import "./BillsDisplayItem.css"

const BillDisplayItem = props => (


  <div className='row rowMargin'>
    <div className='col-md-2'>{props.bill.billName}</div>
    <div className='col-md-1'>{props.bill.billPlannedAmount}</div>
    <div className='col-md-1'>{props.bill.billActualAmount}</div>
    <div className='col-md-1'>{props.bill.billStatic}</div>
    <div className='col-md-2'>Edit/Delete</div>
  </div>

)


export default BillDisplayItem;