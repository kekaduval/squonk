import React from "react";
import "./BudgetBar.css";


const BudgetBar = props => {

console.log(props.value.currentBudgetPlannedAmount);
console.log(props.value);
console.log(props.value.userBudgets.length);
// for (var i = 0; i < props.value.userBudgets; i++) {
//   return (
//     <option id={props.value.userBudgets.userId}></option>
//   )
// }
// insert a for loop to separate and create the elements.
let budgetItems = props.value.budgetNameList.map(budgets => {
// let budgetItems = props.value.map(budgets => {
  console.log(budgets);
  return (
    <option id="select" key={budgets} value="budgets">{budgets}</option>
  )
})

let initialBudgetPlannedAmount = props.value.currentBudgetPlannedAmount;
// let actualAmount = props.value.currentBudgetActualAmount;



let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount)})
let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)

console.log("Bills Actual Values for the Budget", billActualAmountValues);
console.log("Bill Actual Values Total for the Budget",allBillsActualAmountSum);
  


let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)
console.log("Bills Planned Values for the Budget", billPlannedAmountValues);
console.log("Bill Planned Values Total for the Budget", allBillsPlannedAmountSum);

let totalBillPlannedAmount = initialBudgetPlannedAmount + allBillsActualAmountSum;
let leftAmount = totalBillPlannedAmount - allBillsActualAmountSum  

console.log("afdafagasgas"+ typeof(totalBillPlannedAmount));







const style = {
  color: allBillsActualAmountSum > totalBillPlannedAmount ? 'red' : 'green'
};

  return (
    <div className='container marginBottom headerBG'>
    <div className="row bg">
      <div className="col-md-3">
        <h1>Budgets:
          <span><select id="budgetDropDown">
            {budgetItems}
            </select></span></h1>
      </div>

    

      <div className="col-md-3">
          <h1>Planned $:<span className='marginLeft' style={style}>{totalBillPlannedAmount}</span></h1>
      </div>


      <div className="col-md-3">
          <h1>Actual $:<span className='marginLeft' style={style}>{allBillsActualAmountSum.toFixed(2)}</span></h1>
      </div>

        <div className="col-md-3">
          <h1> $Left :<span className='marginLeft' style={style}>{leftAmount.toFixed(2)}</span></h1>
        </div>
    </div>
    </div>
  );
  };


export default BudgetBar;
