import React from 'react';
import AddButton from "../AddButton"
import AcctSettingsButton from "../AcctSettingsButton"

const Navbar = () => (
    <div className='row'>
        <div className='offset-8 col-md-1'>
        <AddButton />
        </div>
        <div className='col-md-1'>
            <AcctSettingsButton />
        </div>
    </div>
)

export default Navbar;