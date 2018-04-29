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

let budgetAmount = props.value.currentBudgetPlannedAmount;
let actualAmount = props.value.currentBudgetActualAmount;

const style = {
  color: actualAmount > budgetAmount ? 'red' : 'green'
};

  return (
    <div className='container'>
    <div className="row bg">
      <div className="col-md-3">
        <form>
        <h1>Budgets</h1>
          <select id="budgetDropDown">
          {budgetItems}
          </select>
        </form>
      </div>
      <div className="col-md-3">
        <h1>Budgeted</h1>
        <p style={style}>{budgetAmount}</p>
      </div>
      <div className="col-md-3">
        <h1>Actual</h1>
        <p style={style}>{actualAmount}</p>
      </div>
    </div>
    </div>
  );
  };


export default BudgetBar;
