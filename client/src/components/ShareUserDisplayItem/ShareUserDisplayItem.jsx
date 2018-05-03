import React from 'react';
import "./ShareUserDisplayItem.css"
import DeleteUserButton from "../DeleteUserButton"


const ShareUserDisplayItem = props => {


  return (
    <div className="col-md-4">{props.sharedWithUsers.user}<span><DeleteUserButton onClick={props.onClick} sharedWithUsers={props.usersIShareWith}
 /></span></div>
  )
}


export default ShareUserDisplayItem;

