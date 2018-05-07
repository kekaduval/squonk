import React from 'react';
import "./AddButton.css"

const AddButton = props => {

  return (
    <div className='container'>
      <button className=" " title="Add a Budget" onClick={props.onClick}>Add Budget</button>
    </div>
  )
}

export default AddButton;
