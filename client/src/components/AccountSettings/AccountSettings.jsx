import React from 'react';
import "./AccountSettings.css"
import Navbar from "../Navbar"
import SecQuestionsDisplay from "../SecQuestionsDisplay"
import PasswordDisplayChange from "../PasswordDisplayChange"
import AccountDelete from "../AccountDelete"



const AccountSettings = props => {

  // showSecQues: false,
  //   showPasswordChange: false,


  return (
    <React.Fragment>
      <Navbar />
      <div className='container marginTopAndBottom'>



        <div className="col-md-6 headerBG headerBorderRight">
          <h2>Account Settings</h2>
        </div>

        <div className="col-md-6 headerBG">
          <h2>Info</h2>

        </div>
        <div className="col-md-6 acctBorder">
          <button className="formButton" onClick={props.handleClickSec}>Change Security Questions </button>
          <button className="formButton" onClick={props.handleClickPass}> Change Password </button>
          <button className="formButton" onClick={props.handleClickAcctDelete}> Delete Account </button>
          <button className="formButton" onClick={(event) => props.handleClickCancel(event)}> Cancel </button>


        </div>
        <div className="col-md-6 acctBorder ">

{props.value.showSecQues ? (
<<<<<<< HEAD
        <SecQuestionsDisplay
              onClick={props.handleClickCancelSec}
        />
=======
        <SecQuestionsDisplay 
              onClick={props.handleClickCancelSec} 
              handleChange={props.handleChange}
              value={props.value}      
              onClickSubmit={props.handleClickSubmitPass}
              onClickSubmitSec={props.handleClickSubmitSecQuestions}
        />         
>>>>>>> 363da12cda0cfb4515ef1317a39b13209b59d72f
          ):(null)}


        {props.value.showPasswordChange ? (
          <PasswordDisplayChange
            onClick={props.handleClickCancelPass}
            handleChange={props.handleChange}
            value={props.value}
            onClickSubmit={props.handleClickSubmitPass}
          />
        ) : (null)}

          {props.value.showAcctDelete ? (
            <AccountDelete
              onClick={props.handleClickCancelAcctDelete}
            />
          ) : (null)}




      </div>









      </div>
    </React.Fragment>
  )
}

export default AccountSettings;
