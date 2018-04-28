import React from "react";
import "./BillsDisplay.css";
import BillDisplayItem from "../BillDisplayItem";

class BillsDisplay extends React.Component {
  render() {
    let billDisplayItems;
    if (this.props.bills.length >= 1) {
      billDisplayItems = this.props.bills.map(bills => {
        console.log(bills);
        return <BillDisplayItem key={bills._id} bills={bills} />;
      });
    } else {
      billDisplayItems = "No Bills Are Availabile";
      return <h1>{billDisplayItems}</h1>;
    }

    console.log(this.props);
    return (
      <React.Fragment>
        <div className="Bills">{billDisplayItems}</div>
      </React.Fragment>
    );
  }
}

export default BillsDisplay;
