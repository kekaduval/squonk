import React from "react";
import "./BudgetBar.css";
import EditShareButton from "../EditShareButton"
import DropDownMenu from "../DropDownMenu"


const BudgetBar = props => {

  console.log(props.budgets);

  console.log("kkkkkkkkk", props.chosenBudget.budgetName);
  console.log("LLLLLLLL", props.usersWhoShareWithMe);


  let findThisBudgetOwner = "";

  if (props.usersWhoShareWithMe) {
    findThisBudgetOwner = props.usersWhoShareWithMe.map(i => {
      i.budget === props.chosenBudget.budgetName
      return (i.owner)
    })
  }
  console.log("PPPPPPPPP", findThisBudgetOwner);

console.log("Planned Amount", props.chosenBudget.budgetPlannedAmount )

  let initialBudgetPlannedAmount = props.chosenBudget.budgetPlannedAmount;
  let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount) })
  let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)

  // console.log("Bills Actual Values for the Budget", billActualAmountValues);
  // console.log("Bill Actual Values Total for the Budget", allBillsActualAmountSum);


  let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
  let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)
  // console.log("Bills Planned Values for the Budget", billPlannedAmountValues);
  // console.log("Bill Planned Values Total for the Budget", allBillsPlannedAmountSum);

  let totalBillPlannedAmount = (initialBudgetPlannedAmount || 0);
  let leftAmount = totalBillPlannedAmount - allBillsActualAmountSum

  let sharedWithMeMessage = findThisBudgetOwner !== props.myName
  console.log("999999999999", sharedWithMeMessage);
  console.log("555555555", findThisBudgetOwner);




  const style = {
    color: allBillsActualAmountSum > totalBillPlannedAmount ? 'red' : 'green'
  };

  return (
    <React.Fragment>
      <div className='container marginBottom headerBG'>
        <div className="row bg">
          <div className="col-md-3">
            <h2>Budgets:
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

                  <span><button className="btn btn-danger deletePosition" onClick={(event) => props.handleClickDeleteBudget(props.chosenBudget._id, event)}>-</button></span>

                ) : (null)}
              </span></h2>
          </div>


          <div className="col-md-3">
            <h2>Planned $:<span className='marginLeft' style={style}>{parseFloat(totalBillPlannedAmount).toFixed(2)}</span></h2>
          </div>

          <div className="col-md-3">
            <h2>Actual $:<span className='marginLeft' style={style}>{parseFloat(allBillsActualAmountSum).toFixed(2)}</span></h2>
          </div>

          <div className="col-md-2">
            <h2> $Left :<span className='marginLeft' style={style}>{parseFloat(leftAmount).toFixed(2)}</span></h2>
          </div>
        </div>
      </div>



      {props.usersIShareWith.length ? (
        <div className='row text-center'>
          <div className='col-md-12'>
            <h3>"This is a Shared Budget"  <span><EditShareButton onClick={props.handleClick} /></span></h3>

          </div>
        </div>) : (false)}



      {sharedWithMeMessage && props.chosenBudget.userName !== props.myName ? (<div className='row text-center'>
        <div className='col-md-12'>
          <h3>"This is a Shared Budget from {findThisBudgetOwner}</h3>

        </div>
      </div>) : (null)}
    </React.Fragment>

  );
};


export default BudgetBar;
