import React from 'react';
import Navbar from '../../components/Navbar';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
// import AddButton from "../../components/AddButton"
import BudgetBar from "../../components/BudgetBar"
import BillsDisplay from "../../components/BillsDisplay";
import UserLookup from "../../components/UserLookup"



class Budgets extends React.Component {

    state = {
        userId: "5ae49802b1ef377b04cd52ae", //UserID
        userName: "nathan", //Name of userlogged in
        budgetName: "", //name of Budget user creates
        budgetNameList: [], //List of Budget Name
        budgetPlannedAmount: "", //Planned Amount when user creates a budget
        currentBudgetPlannedAmount: "", //Planned Amount that will pull into the budget bar
        currentBudgetActualAmount: "",  //Planned Amount that will pull into the budget bar
        budgetActualAmount: "", //The Amount left in the budget after bills are added
        userBudgets: [], //A list of all user budgets when they log in
        userChosenBudgetName: "", //Budget ID of the Budget the user is viewing
        userChosenBudgetId: "", //The ID of the budget the user has selected
        userChosenBudgetBills: [], //The bills to the budget the user has selected
        userChosenBudgetBillObjects: [], //A list of all the users bills when they log in
        billName: "", //name of the bill when user creates one
        billPlannedAmount: "", //name of the planned bill amount during creation
        billActualAmount: "", //name of the actual amount of a bill during creation
        editBillName:"", //edit bills name
        editBillPlannedAmount:"",//edit bills planned amount
        editBillActualAmount:"", //edit bills actual amount
        billStatic: false, //User's decision if this a static planned and actual amount during bill creation
        showAddBudget: false, //keeps Add budget hidden until Add Budget is clicked
        showAddBill: false, // keeps Add Bill hidden until Add Bill is clicked
        editBill: false, // keeps edit bill hidden until a bills edit button is clicked
        editBillID: "",
        allUsers: [], //all users names and IDs
        showUserLookup: false,
        userToShareBudget: "",
    }

    componentDidMount() {
        this.loadBudgets();
        this.getAllUsers();
    }


    //loads on page load. Gets all the users budgets
    loadBudgets = () => {
        const userId = this.state.userId;
        API.getUserBudgets(userId)
            .then(res => {
                this.setState({
                    userBudgets: res.data.budgets
                });
                // console.log("All the User Budgets ", this.state.userBudgets);
                let userBudgetNames = this.state.userBudgets.map(budget => {
                    return budget.budgetName
                })
                this.setState({
                    budgetNameList: userBudgetNames
                })
                // console.log(userBudgetNames);
                // console.log(userPlannedAmount);
                // console.log(userActualAmount);
                // console.log(this.state);
                this.userFirstBudget()
            })
            .catch(err => console.log(err));
    }


    //grabs the first user budget to load bills
    userFirstBudget = () => {
        this.setState({
            userChosenBudgetName: this.state.userBudgets[0].budgetName,
            userChosenBudgetId: this.state.userBudgets[0]._id,
            currentBudgetPlannedAmount: this.state.userBudgets[0].budgetPlannedAmount,
            currentBudgetActualAmount: this.state.userBudgets[0].actualAmount,
        })
        // console.log("User chosen budget is ", this.state.userChosenBudgetName);
        this.userBudgetBillsID();
    }


    //grabs all the bills associated with the chosen budget
    userBudgetBillsID = () => {
        const budgetId = this.state.userChosenBudgetId;
        console.log(budgetId);
        API.getBudgetBills(budgetId)
            .then(res => {
                this.setState({
                    userChosenBudgetBills: res.data.bills,
                });
                // console.log("Bills associated with chosen Budget", this.state.userChosenBudgetBills);
                // console.log("Budget ID associated with chosen bull", this.state.userChosenBudgetId);
            })
            .catch(err => console.log(err));
    }


    //input boxes information for adding a Budget
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state.userToShareBudget);

        // console.log(this.state.billName);
        // console.log(this.state.billPlannedAmount);
        // console.log(this.state.billActualAmount);
    };

    //input boxes information for adding a Budget
    editHandleChange = event => {
        const { name, value } = event.target;
        // console.log(event.target);

        this.setState({
            [name]: value
        });
        // console.log("mmmmmmmmmmmmmm",this.state.editBillName);
        // console.log("nnnnnnnnnnnnnn",this.state.editBillPlannedAmount);
        // console.log("oooooooooooooo",this.state.editBillActualAmount);
    };

    //creating a budget, tieing it to a user and updating all users budget state
    submitBudgetClick = () => {
        const userPotentialBudgetName = this.state.budgetName;

        const matchBudgetName = this.state.userBudgets.find(i => i.budgetName === userPotentialBudgetName)

        if (matchBudgetName) {
            alert("You already have a budget by that name")
        } else {

            // console.log("Budget Submitted");
            const newBudget = {
                userId: this.state.userId,
                userName: this.state.userName,
                budgetName: this.state.budgetName,
                budgetPlannedAmount: this.state.budgetPlannedAmount,
                actualAmount: 0.00
            }
            API.createBudget(newBudget)
                .then(this.setState({
                    showAddBudget: false,
                    budgetName: "",
                    budgetPlannedAmount: ""
                 }))
                .then(this.loadBudgets())
                .catch(err => console.log(err));
        }
    };


    //creating a bill, tieing it to a users budget and updating all users bills state
    submitBillClick = () => {
        const userPotentialBillName = this.state.billName;
        const matchBillName = this.state.userChosenBudgetBills.find(i => i.billName === userPotentialBillName)
        if (matchBillName) {
            alert("You already have a bill by that name")
        } else {
            // console.log("Bill Submitted");
            const newBill = {
                userId: this.state.userId,
                userName: this.state.userName,
                budgetId: this.state.userChosenBudgetId,
                budgetName: this.state.userChosenBudgetName,
                billName: this.state.billName,
                billPlannedAmount: this.state.billPlannedAmount,
                billActualAmount: this.state.billActualAmount ? this.state.billActualAmount:0.00,
                billStatic: this.state.billStatic,
            }
            API.createBill(newBill)
                .then(res => {
                    this.setState({
                        userBills: res.data
                    });
                    // console.log(this.state.userBills);
                    this.userBudgetBillsID();
                })
                .then(this.setState({
                    showAddBill: false,
                    billName: "",
                    billPlannedAmount: "",
                    billActualAmount: ""
                 }))
                .catch(err => console.log(err));
        }
    };


    // updating a bill, tieing it to a users budget and updating all users bills state
    updateBillClick = (event) => {
            // console.log("Bill Updated");
            const updateBill = {
                billId: this.state.editBillID,
                body:{
                userId: this.state.userId,
                userName: this.state.userName,
                budgetId: this.state.userChosenBudgetId,
                budgetName: this.state.userChosenBudgetName,
                billName: this.state.editBillName,
                billPlannedAmount: this.state.editBillPlannedAmount,
                billActualAmount: this.state.editBillActualAmount ? this.state.editBillActualAmount : 0.00,
                billStatic: this.state.billStatic,
                }
            }
            API.updateBill(updateBill)
                .then(res => {
                    this.setState({
                        userBills: res.data
                    });
                    console.log(this.state.userBills);
                    this.userBudgetBillsID();
                })
                .then(this.setState({
                    editBill: false,
                    editBillName: "",
                    editBillPlannedAmount: "",
                    editBillActualAmount: ""
                }))
                .catch(err => console.log(err));

    };

// This is the function that gets the selected value from the dropdown ?????????
    getSelectedValue = (event) => {
      event.preventDefault();
      var x = event.target.selectedIndex;
      let selectedValue = event.target.options[x].dataset.id
      // selectedValue is the budget id
      console.log("The new ID should be:" + selectedValue);
      this.setState({ userChosenBudgetId: selectedValue });
            API.getBudgetBills(selectedValue)
                .then(res => {
                    this.setState({
                        userChosenBudgetBills: res.data.bills,
                    });
    }).catch(err => console.log(err));
}

    deleteBill = (id, event) => {
        event.preventDefault();
        alert("Hi " + id)
        const data = {
            billId: id,
            budgetId: this.state.userChosenBudgetId
        }
        API.deleteBill(data)
            .then(res => console.log(res))
            .then(alert("User Added"))
            .catch(err => console.log(err));
    }

    addUserToMyBudget = (id) => {
       const usersIDToAdd = id;
       const budgetToAddTo = this.state.userChosenBudgetId;

       const data = {
           user: usersIDToAdd,
           budget: budgetToAddTo
       }
        API.shareBudget(data)
            .then(res => console.log(res))
            .then(this.userBudgetBillsID())
            .catch(err => console.log(err));
    }


    showAddBudget = () => {
        this.setState({
            showAddBudget: true,
            showAddBill: false,
            editBill: false,
            showUserLookup: false
         })
    }

    showAddBill = () => {
        this.setState({
            showAddBill: true,
            showAddBudget: false,
            editBill: false,
            showUserLookup: false
         })
    }

    editBill = (id, event) => {
        event.preventDefault()
        this.setState({
            editBill: true,
            showAddBudget: false,
            showAddBill: false,
            showUserLookup: false,
            editBillID: id
         })
    }


    showUserLookup = () => {
        this.setState({
            showAddBill: false,
            showAddBudget: false,
            editBill: false,
            showUserLookup: true
        })
    }

    cancelAddBudget = () => {
        this.setState({ showAddBudget: false })
    }

    cancelAddBill = () => {
        this.setState({ showAddBill: false })
    }

    cancelEditBill = () => {
        this.setState({ editBill: false })
    }

    cancelShowUserLookup = () => {
        this.setState({ showUserLookup: false })
    }


    getAllUsers = () => {
        API.getUsers()
            .then(res => {
                console.log('this is res ',res);

                const allUsers = res.data.map(index => {
                    return (
                        {
                            userName: index.user,
                            userID: index.userID
                        }
                    )
                })
                console.log("All Users", allUsers);
                this.setState({
                    allUsers: allUsers
                })
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <React.Fragment>
                <Navbar
                    handleClick={this.showAddBudget}
                    handleUserClick={this.showUserLookup}
                />
                <BudgetBar
                    value={this.state}
                    bills={this.state.userChosenBudgetBills}
                    handleChange={this.getSelectedValue}
                />
                {this.state.showAddBudget ? (
                    <AddBudget
                        handleChange={this.handleChange}
                        value={this.state}
                        handleClick={this.submitBudgetClick}
                        handleClickCancel={this.cancelAddBudget}
                    />) : (false)}
                {this.state.showUserLookup ? (
                    <UserLookup
                        handleChange={this.handleChange}
                        value={this.state}
                        handleClick={this.addUserToMyBudget}
                        allUsers={this.state.allUsers}
                        userToShareBudget={this.state.userToShareBudget}
                        handleClickCancel={this.cancelShowUserLookup}
                    />) : (false)}
                <BillsDisplay
                    bills={this.state.userChosenBudgetBills}
                    // budgetid={this.state.userChosenBudgetId}
                    handleClick={this.submitBillClick}
                    value={this.state}
                    handleChange={this.handleChange}
                    handleEditChange={this.editHandleChange}
                    deleteClick={this.deleteBill}
                    updateBillClick={this.updateBillClick}
                    onClick={this.showAddBill}
                    showBillStatus={this.state.showAddBill}
                    editBill={this.state.editBill}
                    handleClickCancel={this.cancelAddBill}
                    editBillShow={this.editBill}
                    noEditBillShow={this.cancelEditBill}
                    bills={this.state.userChosenBudgetBills}
                />

            </ React.Fragment>
        )
    }
}

export default Budgets;
