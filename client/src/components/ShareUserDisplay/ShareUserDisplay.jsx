import React from 'react';
// import BudgetSubmitButton from '../BudgetSubmitButton'
import CancelButton from '../CancelButton'
import "./ShareUserDisplay.css"
import ShareUserDisplayItem from '../ShareUserDisplayItem'
import DeleteUserButton from "../DeleteUserButton"

const ShareUserDisplay = props => {


  return (

    <div className='container'>
      <div className="row">
        <div className="col">
          <div className='row'>
              <h3>Users I Shared This Budget With</h3>
          </div> 
          <div className='row'>     
            {props.usersIShareWith.map(user => {
              return (
                <ShareUserDisplayItem 
                  key={user.userID}
                  userInfo={user}
                  onClick={props.handleClick}   
                  value={props.value}        
                />
              )
            })}
          </div>
        </div>



       
          {/* <div className="col">
            <div className='row'>
              <h3>Users Shared Budgets I'm In</h3>
            </div>
            <div className='row'>
              {props.usersWhoShareWithMe.map(i => {
              return (<div className="col-md-4">{i.user}<span><DeleteUserButton onClick={props.handleClick} sharedWithMe={props.usersWhoShareWithMe} /></span></div>
                )
              })}
            </div>
          </div>  */}
      </div>
      <CancelButton onClick={props.handleClickCancel} />
    </div>
   
  )
}

export default ShareUserDisplay;


// usersIShareWith = { this.state.sharedBudgetWithUsers }
// usersWhoShareWithMe = { this.state.usersSharedBudgetWithMe }