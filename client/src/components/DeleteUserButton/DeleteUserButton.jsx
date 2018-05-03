import React from 'react';
import "./DeleteUserButton.css"

const DeleteUserButton = props => {

  return (
  <div className=''>
      <button className=" btn btn-success circleBtn" title="Click to a Add a Bill" onClick={(event) => props.onClick(props.sharedWithUsers.user, props.sharedWithUsers.userID, event )}>-
  </button>
  </div>
  )
}

export default DeleteUserButton;

