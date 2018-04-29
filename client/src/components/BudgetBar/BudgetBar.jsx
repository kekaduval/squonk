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
    <div className='container'>
    <div className="row bg">
      <div className="col-md-3">
        <form>
          <select>
          {budgetItems}
          </select>
        </form>
      </div>
      <div className="col-md-3">
        Budgeted

      </div>
      <div className="col-md-3">
        <p>Actual</p>

      </div>
    </div>
    </div>
  );
  };


export default BudgetBar;
