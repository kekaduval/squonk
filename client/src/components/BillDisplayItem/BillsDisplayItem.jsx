import React from 'react';
import "./BillsDisplayItem.css"

class BillDisplayItem extends React.Component{

render(){
  return (
    <React.Fragment>
      <p>Name: {this.props.bills.billName} - Amount: {this.props.bills.billPlannedAmount}</p>
    </React.Fragment>
  )
}
}

export default BillDisplayItem;
