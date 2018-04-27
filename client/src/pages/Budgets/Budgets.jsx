import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import AddButton from "../../components/AddButton"
import BudgetBar from "../../components/BudgetBar";



class Budgets extends React.Component {

    state = {
        userId: "5ae25e793217552b542c310e", //UserID
        userName: "nathan", //Name of userlogged in
        budgetName: "", //name of Budget user creates
        budgetPlannedAmount: "", //Planned Amount when user creates a budget
        userBudgets: [], //A list of all user budgets when they log in
        userBills: [], //A list of all the users bills when they log in
        billName: "", //name of the bill when user creates one
        billPlannedAmount: "", //name of the planned bill amount during creation
        billStatic: "", //User's decision if this a static planned and actual amount during bill creation
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

//creating a budget, tieing it to a user and updating all users budget state
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

//creating a bill, tieing it to a users budget and updating all users bills state

    submitBillClick = () => {
        console.log("Bill Submitted");
        const newBill = {
            userId: this.state.userId,
            userName: this.state.userName,
            budgetName: this.state.budgetName,
            billName: this.state.budgetPlannedAmount,
            billPlannedAmount: this.state.budgetPlannedAmount,
            billActualAmount: "",
            billStatic: "",

        }

        API.createBill(newBill)
            .then(res => {
                this.setState({
                    userBills: res.data
                });
                console.log(this.state.userBills);
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

            <AddButton />
            <BudgetBar />
            </div>
                <AddBudget handleChange={this.handleChange} value={this.state} handleClick={this.submitBudgetClick}/>
        </ React.Fragment>

        )
    }
}

export default Budgets;