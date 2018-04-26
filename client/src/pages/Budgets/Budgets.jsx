import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";


class Budgets extends React.Component {

    state = {
        userId: "5ae223edcaab7a10731e1723",
        userName: "gabe",
        budgetName: "",
        budgetPlannedAmount: "",
        userBudgets: [],
    }

    // usernames and ObjectIDs
    // gabe - "5ae223edcaab7a10731e1723"
    // nathan - "5ae223edcaab7a10731e1724"
    // keka - "5ae223edcaab7a10731e1725"



    //input boxes information for adding a Budget
    handleChange = event => {
        console.log("Helloooo");
        const {name, value } = event.target;
        this.setState({
            [name]: value    
        });
        console.log(this.state);
    };


    submitBudgetClick = () => {
        console.log("Budget Submitted");
        const newBudget = {
            userId: this.state.userId,
            userName: this.state.userName,
            budgetName: this.state.budgetName,
            budgetPlannedAmount: this.state.budgetPlannedAmount,
            actualAmount: this.state.budgetPlannedAmount
        }

        API.createBudget(newBudget)
            .then(res => {
                this.setState({
                    userBudgets: res.data
                });
                console.log(this.state.userBudgets);
            })
            .catch(err => console.log(err));
    };

    // submitBudgetClick = () => {
    //     API.getUsers()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    // submitBudgetClick = () => {
    //     API.getBudgets()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    // submitBudgetClick = () => {
    //     API.getBills()
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };





    render() {
        return (
            <React.Fragment>
            <div className=''>
            <h1 className=''>Budget Bar</h1>
            </div>

                <AddBudget handleChange={this.handleChange} value={this.state} handleClick={this.submitBudgetClick}/>
        </React.Fragment >
        )
    }
}

export default Budgets;