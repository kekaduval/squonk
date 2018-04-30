import React from 'react';
import AddButton from "../AddButton"
import AcctSettingsButton from "../AcctSettingsButton"

const Navbar = props => (
    <div className='row'>
        <div className='offset-8 col-md-1'>
        <AddButton onClick={props.handleClick}/>
        </div>
        <div className='col-md-1'>
            <AcctSettingsButton />
        </div>
    </div>
)

export default Navbar;