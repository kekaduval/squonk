import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";



const BillsDisplay = (props) => (
  
<div className='container'>
    {props.bills.length ? ( props.bills.map(bill => {
      return(
        <React.Fragment key={props.budgetid}>
        <BillDisplayItem bill={bill} budgetid={props.budgetid}/>

       </React.Fragment>
      )
    })
    ) : (<h3 className="text-center">No Bills found</h3>)}
  </div>
)

export default BillsDisplay;


