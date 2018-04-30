import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";
import AddBill from "../AddBill"
import AddBillButton from "../AddBillButton"



const BillsDisplay = props => (

  <div className='container'>
    <div className='row rowMargin'>
      <div className='col-md-2'><h6>Bill Name</h6></div>
      <div className='col-md-1'><h6>Planned Amount</h6></div>
      <div className='col-md-1'><h6>Acutal Amount</h6></div>
      <div className='col-md-1'><h6>Status</h6></div>
      <div className='col-md-2'><h6>Edit/Delete</h6></div>
    </div>

    {props.bills.length ? (props.bills.map(bill => {
      return (

        <React.Fragment key={bill._id}>
          {/* <BillDisplayItem bill={bill} budgetid={props.budgetid} /> */}
          <BillDisplayItem bill={bill} />

        </React.Fragment>
      )
    })
    ) : (<h3 className="text-center">No Bills found</h3>)}

    <AddBillButton onClick={props.onClick} />

    {props.showBillStatus ? (
      <AddBill handleClick={props.handleClick} onClick={props.handleClickCancel} value={props.value} handleChange={props.handleChange} />) : (null)}
  </div>
)

export default BillsDisplay;


