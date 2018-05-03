import React from "react";
import "./BudgetBar.css";
import EditShareButton from "../EditShareButton"


const BudgetBar = props => {

  console.log(props.budgets);

  console.log("kkkkkkkkk", props.chosenBudget.budgetName);
  console.log("LLLLLLLL", props.usersWhoShareWithMe);

  let findThisBudget = props.usersWhoShareWithMe.map(i => {
    i.budget === props.chosenBudget.budgetName 
    return i.owner

  } )
  console.log("PPPPPPPPP", findThisBudget);

  
  
  let budgetItems;
    if (props.budgets.length > 0) {
    budgetItems = props.budgets.map(budgets => {

      // console.log(budgets);
      return (<option id="select" key={budgets._id} data-id={budgets._id} >{budgets.budgetName}</option>)
     })
  }

  let initialBudgetPlannedAmount = props.chosenBudget.budgetPlannedAmount;
  let billActualAmountValues = props.bills.map(i => { return (i.billActualAmount) })
  let allBillsActualAmountSum = billActualAmountValues.reduce((a, b) => a + b, 0)

  // console.log("Bills Actual Values for the Budget", billActualAmountValues);
  // console.log("Bill Actual Values Total for the Budget", allBillsActualAmountSum);


  let billPlannedAmountValues = props.bills.map(i => { return (i.billPlannedAmount) })
  let allBillsPlannedAmountSum = billPlannedAmountValues.reduce((a, b) => a + b, 0)
  // console.log("Bills Planned Values for the Budget", billPlannedAmountValues);
  // console.log("Bill Planned Values Total for the Budget", allBillsPlannedAmountSum);

  let totalBillPlannedAmount = initialBudgetPlannedAmount;
  let leftAmount = totalBillPlannedAmount - allBillsActualAmountSum

  let sharedWithMeMessage = findThisBudget !== props.myName
  console.log("999999999999", sharedWithMeMessage);
  console.log("555555555", findThisBudget);
  
  


  const style = {
    color: allBillsActualAmountSum > totalBillPlannedAmount ? 'red' : 'green'
  };

  return (

    <React.Fragment>
    <div className='container marginBottom headerBG'>
      <div className="row bg">
        <div className="col-md-3">
          <h1>Budgets:
          <span><select id="budgetDropDown" onChange={props.handleChange}>
          {budgetItems}
            </select></span></h1>
        </div>

        <div className="col-md-3">
          <h1>Planned $:<span className='marginLeft' style={style}>{parseFloat(totalBillPlannedAmount).toFixed(2)}</span></h1>
        </div>

        <div className="col-md-3">
          <h1>Actual $:<span className='marginLeft' style={style}>{parseFloat(allBillsActualAmountSum).toFixed(2)}</span></h1>
        </div>

        <div className="col-md-3">
          <h1> $Left :<span className='marginLeft' style={style}>{parseFloat(leftAmount).toFixed(2)}</span></h1>
        </div>     
      </div> 
    </div>



 {props.usersIShareWith.length ? (
      <div className='row text-center'>
        <div className='col-md-12'>
            <h3>"This is a Shared Budget"  <span><EditShareButton onClick={props.handleClick}/></span></h3>
          
        </div>
      </div>) :(false)}



      {sharedWithMeMessage && props.chosenBudget.userName !== props.myName ? (<div className='row text-center'>
        <div className='col-md-12'>
          <h3>"This is a Shared Budget from {findThisBudget}</h3>

        </div>
      </div>) :(null)} 


    

 



 </React.Fragment>

  );
};
 

export default BudgetBar;
