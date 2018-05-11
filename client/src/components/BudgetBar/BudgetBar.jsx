import React from "react";
import "./BudgetBar.css";
import EditShareButton from "../EditShareButton"
import DropDownMenu from "../DropDownMenu"


const BudgetBar = props => {

  let findThisBudgetOwner = "";

  if (props.usersWhoShareWithMe) {
    findThisBudgetOwner = props.usersWhoShareWithMe.map(i => {
      i.budget === props.chosenBudget.budgetName
      return (i.owner)
    })
  }

  let initialBudgetPlannedAmount = props.chosenBudget.budgetPlannedAmount || 0;
  let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount) })
  let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)

  let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
  let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)

  let totalBillPlannedAmount=""; 
  
  if (allBillsPlannedAmountSum > initialBudgetPlannedAmount) {
    totalBillPlannedAmount = allBillsPlannedAmountSum
  }else{
    totalBillPlannedAmount = initialBudgetPlannedAmount
  }
  let leftAmount = totalBillPlannedAmount - allBillsActualAmountSum

  let sharedWithMeMessage = findThisBudgetOwner !== props.myName



  const style = {
    color: allBillsActualAmountSum > totalBillPlannedAmount ? 'red' : 'green'
  };

  return (
    <React.Fragment>
      <div className='container marginBottom headerBG'>
        <div className="row bg">
          <div className="col-md-3">
            <h3>Budgets:
          <span><select id="budgetDropDown" onChange={props.handleChange}>
                {props.budgets.length ? (props.budgets.map(budget => {
                  return (
                     <DropDownMenu key={budget._id}
                        budget={budget}
                      />
                  )
                })
                ) : (null)
                }
              </select>
                {props.budgets.length ? (

                  <span><button className="btn btn-danger deletePosition" onClick={(event) => props.handleClickDeleteBudget(props.chosenBudget._id, event)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>

                  </button></span>

                ) : (null)}
              </span></h3>
          </div>


          <div className="col-md-3">
            <h4>Planned $:<span className='marginLeft' style={style}>{parseFloat(totalBillPlannedAmount).toFixed(2)}</span></h4>
          </div>

          <div className="col-md-3">
            <h4>Actual $:<span className='marginLeft' style={style}>{parseFloat(allBillsActualAmountSum).toFixed(2)}</span></h4>
          </div>

          <div className="col-md-2">
            <h4> Left $ :<span className='marginLeft' style={style}>{parseFloat(leftAmount).toFixed(2)}</span></h4>
          </div>
        </div>
      </div>



      {props.usersIShareWith.length ? (
        <div className='row text-center'>
          <div className='col-md-12'>
            <h3>"This is a Shared Budget"  <span><EditShareButton onClick={props.handleClick} /></span></h3>

          </div>
        </div>) : (false)}



      {props.budgets.length && sharedWithMeMessage && props.chosenBudget.userName !== props.myName ? (
      <div className='row text-center'>
        <div className='col-md-12'>
          <h3>"This is a Shared Budget from {findThisBudgetOwner} to remove yourself from this Budget, click "Delete Budget"</h3>
        </div>
      </div>) : (null)}
    </React.Fragment>

  );
};


export default BudgetBar;
