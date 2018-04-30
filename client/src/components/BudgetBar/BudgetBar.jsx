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
    <div className='container marginBottom'>
    <div className="row bg">
      <div className="col-md-3">
        <h1>Budgets:
          <span><select id="budgetDropDown">
            {budgetItems}
            </select></span></h1>
      </div>

    

      <div className="col-md-4">
          <h1>Budgeted Amount: <span className='marginLeft' style={style}>{budgetAmount}</span></h1>
      </div>


      <div className="col-md-4">
          <h1>Actual Amount:<span className='marginLeft'style={style}>{actualAmount}</span></h1>
      </div>
    </div>
    </div>
  );
  };


export default BudgetBar;
