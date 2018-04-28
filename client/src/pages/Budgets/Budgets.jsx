import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import AddButton from "../../components/AddButton"
import BudgetBar from "../../components/BudgetBar"
import BillsDisplay from "../../components/BillsDisplay";
// import BillsContainer from "../../components/BillsContainer";



class Budgets extends React.Component {

    state = {
        userId: "5ae223edcaab7a10731e1723", //UserID
        userName: "gabe", //Name of userlogged in
        budgetName: "", //name of Budget user creates
        budgetNameList: [], //List of Budget Name
        budgetPlannedAmount: [], //Planned Amount when user creates a budget
        budgetActualAmount: "", //The Amount left in the budget after bills are added
        userBudgets: [], //A list of all user budgets when they log in
        userChosenBudget: "", //Budget ID of the Budget the user is viewing
        userChosenBudgetBills: [],
        userChosenBudgetBillObjects: [], //A list of all the users bills when they log in
        billName: "", //name of the bill when user creates one
        billPlannedAmount: "", //name of the planned bill amount during creation
        billStatic: "", //User's decision if this a static planned and actual amount during bill creation
    }

    componentDidMount() {
        this.loadBudgets();

    }


// This will be removed once I add Gabe
    // componentWillMount() {
    //   this.setState({
    //     budgetPlannedAmount: [25 , 2000]
    //   })
    //   this.setState({
    //       billActualAmount: []
    //   })
    // }

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
                let userBudgetNames = this.state.userBudgets.map(budget => {
                return budget.budgetName
                })
                // let userPlannedAmount = this.state.userBudgets.map(budget => {
                // return budget.budgetPlannedAmount
                // })
                // let userActualAmount = this.state.userBudgets.map(budget => {
                // return budget.actualAmount
                // })
                this.setState({
                  budgetNameList: userBudgetNames
                //   // budgetPlannedAmount: userPlannedAmount,
                //   // budgetActualAmount: userActualAmount
                })


                console.log(userBudgetNames);
                // console.log(userPlannedAmount);
                // console.log(userActualAmount);
                console.log(this.state);
                this.userFirstBudget()
            })
            .catch(err => console.log(err));
    }

    //grabs the first user budget to load bills
    userFirstBudget = () =>{
        this.setState({
            userChosenBudget: this.state.userBudgets[0].budgetName
        })
        console.log("User chosen budget is ", this.state.userChosenBudget);
        this.userBudgetBillsID();
    }

    //grabs all the ID of the bills associated with the chosen budget
    userBudgetBillsID = () => {
        const budgetId = this.state.userBudgets[0]._id;
        API.getBudgetBills(budgetId)
            .then(res => {
                this.setState({
                    userChosenBudgetBills: res.data,
                    userChosenBudgetBillObjects: res.data.bills
                });
                console.log("Bills associated with chosen Budget", this.state.userChosenBudgetBills);
                console.log("Bills Objects", this.state.userChosenBudgetBillObjects);
                
            })
            .catch(err => console.log(err));
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

    getBudgetDetails = () =>{

    }

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

    showAddBudget =() =>{

    }

    render() {
        return (
        <React.Fragment>
        <div className=''>
        <AddButton />
        </div>
        <AddBudget handleChange={this.handleChange} value={this.state} handleClick={this.submitBudgetClick}/>
        <BudgetBar value={this.state} />
        <BillsDisplay bills={this.state.userChosenBudgetBillObjects} />
        </ React.Fragment>


        )
    }
}

export default Budgets;
