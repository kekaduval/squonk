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




// class BudgetBar extends React.Component {
  // render() {
  //   console.log(this.props.budgets);
  //   let budgetItems;
  //   // if (this.props.budgets) {
  //     budgetItems = this.props.budgets.map(budgets => {
  //       return (
  //         <option key={budgets} value="budgets">
  //           {budgets}
  //         </option>
  //       );
  //     });
    // }


    // let budgetPlannedTotals = this.props.planned.map(planned => {
    //   return (
    //     <p key={planned.amount} value="budgets">
    //       {planned.amount}
    //     </p>
    //   );
    // });
    // console.log(budgetPlannedTotals);

//     return (
//       <React.Fragment>
//         <div className="row">
//           <div className="col-md-3">
//             <form>
//               <select ref="userBudgets">{budgetItems}</select>
//             </form>
//           </div>
//           <div className="col-md-3">
//             <p>Budgeted</p>
//
//           </div>
//           <div className="col-md-3">
//             <p>Actual</p>
//
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

export default BudgetBar;
