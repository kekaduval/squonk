import React from "react";
import "./BudgetBar.css";


const BudgetBar = props => {

  console.log(props.value.currentBudgetPlannedAmount);
  console.log(props.value);
  let budgetItems;
  if(props.value.userBudgets.length > 0){
    budgetItems = props.value.userBudgets.map(budgets => {
      console.log(budgets);
      return (<option id="select" key={budgets.id} data-id={budgets._id} >{budgets.budgetName}</option>)
     })
  }

  let initialBudgetPlannedAmount = props.value.currentBudgetPlannedAmount;

  let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount) })
  let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)

  console.log("Bills Actual Values for the Budget", billActualAmountValues);
  console.log("Bill Actual Values Total for the Budget", allBillsActualAmountSum);


  let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
  let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)
  console.log("Bills Planned Values for the Budget", billPlannedAmountValues);
  console.log("Bill Planned Values Total for the Budget", allBillsPlannedAmountSum);

  let totalBillPlannedAmount = initialBudgetPlannedAmount + allBillsPlannedAmountSum;
  let leftAmount = totalBillPlannedAmount - allBillsActualAmountSum

<<<<<<< HEAD
  console.log("afdafagasgas" + typeof (totalBillPlannedAmount));
=======

>>>>>>> master

  const style = {
    color: allBillsActualAmountSum > totalBillPlannedAmount ? 'red' : 'green'
  };

  return (
    <div className='container marginBottom headerBG'>
      <div className="row bg">
        <div className="col-md-3">
          <h1>Budgets:
          <span><select id="budgetDropDown" onChange={props.handleChange}>
          {budgetItems}
            </select></span></h1>
        </div>

        <div className="col-md-3">
          <h1>Planned $:<span className='marginLeft' style={style}>{parseFloat(totalBillPlannedAmount).toFixed(2)}</span></h1>
        </div>


        <div className="col-md-3">
          <h1>Actual $:<span className='marginLeft' style={style}>{parseFloat(allBillsActualAmountSum).toFixed(2)}</span></h1>
        </div>

        <div className="col-md-3">
          <h1> $Left :<span className='marginLeft' style={style}>{parseFloat(leftAmount).toFixed(2)}</span></h1>
        </div>
      </div>
    </div>
  );
};


export default BudgetBar;
