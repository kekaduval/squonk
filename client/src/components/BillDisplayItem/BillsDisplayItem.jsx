import React from 'react';
import "./BillsDisplayItem.css"

const BillsDisplayItem = props => {

  const style = {
    color: props.bill.billActualAmount > props.bill.billPlannedAmount ? 'red' : 'green'
  };

  let billStatus= "";

  if (props.bill.billActualAmount === props.bill.billPlannedAmount) {
    billStatus = "Even"  
  } else if (props.bill.billActualAmount > props.bill.billPlannedAmount) {
    billStatus = "Over"
  } else if(props.bill.billActualAmount < props.bill.billPlannedAmount) {
    billStatus = "Under"
  } 
 

  const style1 = {
    color: billStatus === "Over" ? 'red' : 'green'
  };

  return (
    <div className='row rowMargin'>
      <div className='offset-md-1 col-md-1 text-center rowBG'></div>
      <div className='col-md-2 text-center rowBG'><h5 >{props.bill.billName.toUpperCase()}</h5></div>
      <div className='col-md-2 text-center rowBG'><h5 style={style}>${props.bill.billPlannedAmount.toFixed(2)}</h5></div>
      <div className='col-md-2 text-center rowBG'><h5 style={style}>${props.bill.billActualAmount.toFixed(2)}</h5></div>
      <div className='col-md-1 text-center rowBG'><h5 style={style1}>{billStatus}</h5></div>
      <div title={"Edit"} className='col-md-1 text-center rowBG' onClick={(event)=>props.editBillShow(props.bill._id, event)} ><i class="fas fa-edit sizePos fa-1x" style={{color:"blue"}}/></div>

      {props.editBill ? (null):(<div title={"Delete"}className='col-md-1 text-center rowBG' onClick={(event) => props.onClick(props.bill._id, event)}><i className="fa fa-trash sizePos" style={{color:"red"}}/></div>)}
    </div>
  )
}


export default BillsDisplayItem;
