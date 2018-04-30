import React from 'react';

const CancelButton = props => {
    return (

        <button className="btn btn-danger" onClick={props.onClick}>Cancel</button>
    )
}
export default CancelButton;