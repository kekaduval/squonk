import React from "react";
import "./BudgetBar.css";
// import BillDisplayItem from "../BillDisplayItem"

class BudgetBar extends React.Component {
  render() {
    console.log(this.props.budgets);
    let budgetItems;
    // if (this.props.budgets) {
      budgetItems = this.props.budgets.map(budgets => {
        return (
          <option key={budgets} value="budgets">
            {budgets}
          </option>
        );
        console.log()
      });
    // }


    let budgetPlannedTotals = this.props.planned.map(planned => {
      return (
        <p key={planned.amount} value="budgets">
          {planned.amount}
        </p>
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3">
            <form>
              <select ref="userBudgets">{budgetItems}</select>
            </form>
          </div>
          <div className="col-md-3">
            <p>Budgeted</p>
            {budgetPlannedTotals}
          </div>
          <div className="col-md-3">
            <p>Actual</p>
            {budgetPlannedTotals}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BudgetBar;
