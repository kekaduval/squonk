import React from "react";
import "./BudgetBar.css";


const BudgetBar = props => {

console.log(props.value.userBudgets);
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

let selectedItems = document.querySelectorAll('select').filter;
console.log(selectedItems);

  return (
    <div className="row">
      <div className="col-md-3">
        <form>
          <select id="budgetDropDown">
          {budgetItems}
          </select>
        </form>
      </div>
      <div className="col-md-3">
        <p>Budgeted</p>

      </div>
      <div className="col-md-3">
        <p>Actual</p>

      </div>
    </div>
  );
  };


export default BudgetBar;
