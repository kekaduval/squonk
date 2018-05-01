import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";
import AddBill from "../AddBill"
import AddBillButton from "../AddBillButton"



const BillsDisplay = props => {

  let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount) })
  let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)



  let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
  let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)


  return (

    <div className='container'>
      <div className='row rowMargin'>
        <div className='col-md-1  headerBG text-center '><AddBillButton onClick={props.onClick} /></div>
        <div className='col-md-2  headerBG text-center'><h4> Bill Name</h4></div>
        <div className='col-md-2 text-center headerBG'><h4>Planned Amount</h4></div>
        <div className='col-md-2 text-center headerBG'><h4>Acutal Amount</h4></div>
        <div className='col-md-1 text-center headerBG'><h4>Status</h4></div>
        <div className='col-md-1 text-center headerBG'><h4>Edit</h4></div>
        <div className='col-md-1 text-center headerBG'><h4>Delete</h4></div>
      </div>

      {props.bills.length ? (props.bills.map(bill => {
        return (





          <React.Fragment key={bill._id}>
            {/* <BillDisplayItem bill={bill} budgetid={props.budgetid} /> */}
            <BillDisplayItem onClick={props.deleteClick} bill={bill} />







          </React.Fragment>
        )
      })
      ) : (<h3 className="text-center">No Bills found</h3>)}

      <div className='row'>
        <div className='offset-1 col-md-2 text-center'>
          <h4>Totals</h4>
        </div>
        <div className='col-md-2 text-center'>
          <h4>${parseFloat(allBillsPlannedAmountSum).toFixed(2)}</h4>
        </div>
        <div className='col-md-2 text-center'>
          <h4>${parseFloat(allBillsActualAmountSum).toFixed(2)}</h4>
        </div>
      </div>

      <AddBillButton onClick={props.onClick} />

      {props.showBillStatus ? (
        <AddBill handleClick={props.handleClick} onClick={props.handleClickCancel} value={props.value} handleChange={props.handleChange} />) : (null)}
    </div>
  )
}

export default BillsDisplay;


