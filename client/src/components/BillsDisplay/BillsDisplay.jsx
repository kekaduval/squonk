import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";
import AddBill from "../AddBill"
import AddBillButton from "../AddBillButton"



const BillsDisplay = props => (

  <div className='container'>
    <div className='row rowMargin'>
      <div className='col-md-2 text-center headerBG'><h4>Bill Name</h4></div>
      <div className='col-md-2 text-center headerBG'><h4>Planned Amount</h4></div>
      <div className='col-md-2 text-center headerBG'><h4>Acutal Amount</h4></div>
      <div className='col-md-1 text-center headerBG'><h4>Status</h4></div>
      <div className='col-md-2 text-center headerBG'><h4>Edit/Delete</h4></div>
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


