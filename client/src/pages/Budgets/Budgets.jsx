import React from 'react';
import API from "../../utils/API";
import AddButton from "../../components/AddButton";


class Budgets extends React.Component {

    render() {
        return (
            <div className=''>
            <AddButton />
            <h1 className=''>Budget Bar</h1>
            </div>
        )
    }
}

export default Budgets;
