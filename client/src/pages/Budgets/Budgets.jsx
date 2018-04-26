import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import AddButton from "../../components/AddButton";


class Budgets extends React.Component {

    state = {
        user: "gabe",
        budgetName: "",
        budgetPlannedAmount: "",
    }

    //input boxes information for adding a Budget
    handleChange = event => {
        console.log("Helloooo");
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };


    submitBudgetClick = event => {
        event.preventDefault();
        console.log("Budget Submitted");

        const newBudget = {
            budgetName:this.state.budgetName,
            budgetPlanned: this.state.budgetPlannedAmount,
            actualAmount: this.state.budgetPlannedAmount
        }



        API.createBudget(this.state.user, newBudget)
            .then(res => {
                this.setState({
                    articles: res.data.response.docs
                });
                console.log(this.state.articles);
            })
            .catch(err => console.log(err));
    };


    render() {
        return (
            <React.Fragment>
            <div className=''>
            <AddButton />
            <h1 className=''>Budget Bar</h1>
            </div>
                <AddBudget handleChange={this.handleChange} value={this.state} />
        </ React.Fragment>
        )
    }
}

export default Budgets;
