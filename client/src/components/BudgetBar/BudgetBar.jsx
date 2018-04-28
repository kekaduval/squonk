import React from "react";
import "./BudgetBar.css";


const BudgetBar = props => {

let budgetItems = props.value.budgetNameList.map(budgets => {
  console.log(budgets);
  return (
    <option key={budgets} value="budgets">{budgets}</option>
  )
})

  return (
    <div className="row">
      <div className="col-md-3">
        <form>
          <select>
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
