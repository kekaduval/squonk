import React from 'react';
import AddButton from "../AddButton"
import AcctSettingsButton from "../AcctSettingsButton"
import ShareBudgetButton from "../ShareBudgetButton"
import './Navbar.css'

const Navbar = props => {
    return (
        <div className='row marginBottom'>
            <div className='offset-7 col-md-1'>
                <AddButton onClick={props.handleClick} />
            </div>


            {props.budgetListLength.length ? (
            <div className='col-md-1'>
                <ShareBudgetButton onClick={props.handleUserClick} />
                </div>):(null)}

            <div className='col-md-1'>
                <AcctSettingsButton />
            </div>
        </div>
    )
}
export default Navbar;