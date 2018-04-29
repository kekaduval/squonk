import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";
import AddBill from "../AddBill"



const BillsDisplay = props => (
  
<div className='container'>
    <div className='row rowMargin'>
      <div className='col-md-2'><h6>Bill Name</h6></div>
      <div className='col-md-1'><h6>Planned Amount</h6></div>
      <div className='col-md-1'><h6>Acutal Amount</h6></div>
      <div className='col-md-1'><h6>Status</h6></div>
      <div className='col-md-2'><h6>Edit/Delete</h6></div>
    </div>

    {props.bills.length ? ( props.bills.map(bill => {
      return(
        
        <React.Fragment key={props.budgetid}>
        <BillDisplayItem bill={bill} budgetid={props.budgetid}/>

       </React.Fragment>
      )
    })
    ) : (<h3 className="text-center">No Bills found</h3>)}
      <AddBill onClick={props.handleClick} value={props.value} handleChange={props.handleChange}/>
  </div>
)

export default BillsDisplay;


