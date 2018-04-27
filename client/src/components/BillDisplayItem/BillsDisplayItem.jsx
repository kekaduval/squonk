import React from 'react';
import "./BillsDisplayItem.css"

class BillDisplayItem extends React.Component{

render(){
  return (
    <React.Fragment>
    <p>Name: {this.props.bills.name} - Amount: {this.props.bills.amount}</p>
    </React.Fragment>
  )
}
}

export default BillDisplayItem;
