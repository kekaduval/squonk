import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import AddButton from "../../components/AddButton"
import BudgetBar from "../../components/BudgetBar";
import BillsContainer from "../../components/BillsContainer"



class Budgets extends React.Component {

    state = {
        userId: "5ae223edcaab7a10731e1723", //UserID
        userName: "gabe", //Name of userlogged in
        budgetName: "", //name of Budget user creates
        budgetPlannedAmount: "", //Planned Amount when user creates a budget
        userBudgets: [], //A list of all user budgets when they log in
        userChosenBudget: "", //Budget ID of the Budget the user is viewing
        userChosenBudgetBillsID: [],
        userChosenBudgetBillObjects: [], //A list of all the users bills when they log in
        billName: "", //name of the bill when user creates one
        billPlannedAmount: "", //name of the planned bill amount during creation
        billStatic: "", //User's decision if this a static planned and actual amount during bill creation
    }

    componentDidMount() {
        this.loadBudgets();

    }

    // usernames and ObjectIDs
    // gabe - "5ae223edcaab7a10731e1723"
    // nathan - "5ae223edcaab7a10731e1724"
    // keka - "5ae223edcaab7a10731e1725"


    //loads on page load. Gets all the users budgets
    loadBudgets = () => {
        const userId = this.state.userId;
        API.getUserBudgets(userId)
            .then(res => {
                this.setState({
                    userBudgets: res.data.budgets
                });
                console.log("All the User Budgets ",this.state.userBudgets);
                this.userFirstBudget()
            })
            .catch(err => console.log(err));
    }

    //grabs the first user budget to load bills
    userFirstBudget = () =>{
        this.setState({
            userChosenBudget: this.state.userBudgets[0]
        })
        console.log("User chosen budget is ", this.state.userChosenBudget); 
        this.userBudgetBillsID();     
    }

    //grabs all the ID of the bills associated with the chosen budget
    userBudgetBillsID = () => {
        const budgetId = this.state.userChosenBudget;
        API.getBudgetBills(budgetId)
            .then(res => {
                this.setState({
                    userChosenBudgetBillsID: res.data.bills
                });
                console.log("Bills IDs assoc. with chosen Budget", this.state.userChosenBudgetBillsID);              
            })
            .catch(err => console.log(err));
    }

    // getBillsFromObjects = () =>{
    //     this.state.userChosenBudgetBillsID.map(id =>{
        
    //     })
    // }

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
            .then(this.loadBudgets())
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
                <AddButton />
                <BudgetBar />
                <AddBudget handleChange={this.handleChange} value={this.state} handleClick={this.submitBudgetClick}/>
                <BillsContainer userBudgets={this.state.userBudgets}/>
            </ React.Fragment>

        )
    }
}

export default Budgets;