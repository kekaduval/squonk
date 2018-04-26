import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";


class Budgets extends React.Component {

    state = {
        budgetName: "",
        plannedAmount: "",
    }

    handleChange = event => {
        console.log("Helloooo");
        const {name, value } = event.target;
        this.setState({
            [name]: value    
        });
        console.log(this.state);
    };

    render() {
        return (
            <React.Fragment>
            <div className=''>
            <h1 className=''>Budget Bar</h1>
            </div>

                <AddBudget handleChange={this.handleChange} value={this.state}/>
        </React.Fragment >
        )
    }
}

export default Budgets;