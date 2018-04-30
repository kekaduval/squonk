import React from 'react';
import "./AddButton.css"

const AddButton = props => (
  <div className='container'>
    <button className=" btn btn-primary" title="Add a Budget" onClick={props.onClick}>Add Budget
  </button>
  </div>
)

export default AddButton;
