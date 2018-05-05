import React from 'react';
import Navbar from '../../components/Navbar';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
// import AddButton from "../../components/AddButton"
import BudgetBar from "../../components/BudgetBar"
import BillsDisplay from "../../components/BillsDisplay";
import UserLookup from "../../components/UserLookup"
import ShareUserDisplay from "../../components/ShareUserDisplay"
import NoBudgetsNoBillsDisplay from "../../components/NoBudgetsNoBillsDisplay"
import HomePage from '../../components/HomePage'
import LoginPage from '../../components/LoginPage'
import Modal from "../../components/Modal"
import SignUpPage from "../../components/SignUpPage"




class Budgets extends React.Component {

    state = {

        userId: "5aece1c7b725b6197ef6d4ae", //UserID

        userName: "gabe", //Name of userlogged in
        budgetName: "", //name of Budget user creates
        budgetNameList: [], //List of Budget Name
        budgetPlannedAmount: "", //Planned Amount when user creates a budget
        currentBudgetPlannedAmount: "", //Planned Amount that will pull into the budget bar
        currentBudgetActualAmount: "",  //Planned Amount that will pull into the budget bar
        budgetActualAmount: "", //The Amount left in the budget after bills are added
        userBudgets: [], //A list of all user budgets when they log in
        userChosenBudgetName: "", //Budget ID of the Budget the user is viewing
        userChosenBudgetId: "", //The ID of the budget the user has selected
        userChosenBudgetObject: [],
        userChosenBudgetBills: [], //The bills to the budget the user has selected
        userChosenBudgetBillObjects: [], //A list of all the users bills when they log in
        billName: "", //name of the bill when user creates one
        billPlannedAmount: "", //name of the planned bill amount during creation
        billActualAmount: "", //name of the actual amount of a bill during creation
        editBillName: "", //edit bills name
        editBillPlannedAmount: "",//edit bills planned amount
        editBillActualAmount: "", //edit bills actual amount
        billStatic: false, //User's decision if this a static planned and actual amount during bill creation
        showAddBudget: false, //keeps Add budget hidden until Add Budget is clicked
        showAddBill: false, // keeps Add Bill hidden until Add Bill is clicked
        editBill: false, // keeps edit bill hidden until a bills edit button is clicked
        showSharedUsers: false,
        editBillID: "",
        allUsers: [], //all users names and IDs
        showUserLookup: false,
        NoBudgetsNoBillsDisplay: true,
        userToShareBudget: "",
        allSharedBudgetWithUsers: [],
        allUsersSharingBudgetsWithMe: [],
        usersThisBudgetIsSharedWith: [],
        showSquonkGreetingPage: true,
        showLoginPage: false,
        showHomePage: false,
        isModalOpen: false,
        showSignUpPage: false,
        modalMessage: "",
        usernameCreate: "",
        password: "",
        password2: "",
        secQuestion: "",
        secQuestionAnswer: "",
        secQuestion2:"",
        secQuestion2Answer: "",

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
                this.setState({
                    allSharedBudgetWithUsers: res.data.sharingBudgetWith
                });
                this.setState({
                    allUsersSharingBudgetsWithMe: res.data.usersSharedBudgetWithMe

                });


                console.log("User res ", res);
                console.log("All the User Budgets ", this.state.userBudgets);
                console.log("all the budgets I share", this.state.allSharedBudgetWithUsers);
                console.log("All budgets shared with me", this.state.allUsersSharingBudgetsWithMe);



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
                if (this.state.userBudgets.length > 0) {
                    this.userFirstBudget()
                }
                else { }
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
            userChosenBudgetObject: this.state.userBudgets[0]
        })
        console.log("User chosen budget is ", this.state.userChosenBudgetObject);
        this.userBudgetBillsID();
        this.getThisBudgetSharedUsers()
    }


    getThisBudgetSharedUsers = () => {
        console.log("This is all my Shared Users and Budgets ", this.state.allSharedBudgetWithUsers);
        console.log("This is the current budget ID ", this.state.userChosenBudgetId);
        let sharedUsersThisBudget = this.state.allSharedBudgetWithUsers.filter(i => i.budgetID === this.state.userChosenBudgetId)
        this.setState({
            usersThisBudgetIsSharedWith: sharedUsersThisBudget

        });

        console.log("Shared users only for this budget", sharedUsersThisBudget);
        console.log("This is the users in this budget state ", this.state.usersThisBudgetIsSharedWith);

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
        console.log(this.state);

        // console.log(this.state.billName);
        // console.log(this.state.billPlannedAmount);
        console.log("YYYYYUUUUUUUU", this.state.secQuestion);
        console.log("YYYYYGGGGGGGGG", this.state.secQuestion2);
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
        // const userPotentialBudgetName = this.state.userChosenBudgetId;
        // const matchBudgetName = this.state.userBudgets.find(i => i._id === userPotentialBudgetName)

        // if (matchBudgetName) {
        //     alert("You already have a budget by that name")
        // } else {

        const newBudget = {
            userId: this.state.userId,
            userName: this.state.userName,
            budgetName: this.state.budgetName,
            budgetPlannedAmount: this.state.budgetPlannedAmount,
            actualAmount: 0
        }
        API.createBudget(newBudget)
            .then(res => {

                console.log("UUUUUUUUUUUUUUUUUU", res);

                this.setState({
                    userBudgets: res.data
                });
                this.loadBudgets()
            })
            .then(this.setState({
                showAddBudget: false,
                budgetName: "",
                budgetPlannedAmount: "",
            })
            )
            .catch(err => console.log(err));
        // }
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
                billActualAmount: this.state.billActualAmount ? this.state.billActualAmount : 0.00,
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
            body: {
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
        let chosenBudgetObject = this.state.userBudgets.find(i => i._id === selectedValue);

        this.setState({ userChosenBudgetId: selectedValue });

        API.getBudgetBills(selectedValue)
            .then(res => {
                this.setState({
                    userChosenBudgetBills: res.data.bills,
                    userChosenBudgetObject: chosenBudgetObject
                });
                console.log("The chosen budget object is ", this.state.userChosenBudgetObject);
                this.getThisBudgetSharedUsers()
            }

            ).catch(err => console.log(err));
    }


    deleteBill = (id, event) => {
        event.preventDefault();
        const data = {
            billId: id,
            budgetId: this.state.userChosenBudgetId
        }
        API.deleteBill(data)
            .then(res => console.log(res))
            .then(this.loadBudgets())
            .catch(err => console.log(err));
    }

    deleteBudget = (id, event) => {
        event.preventDefault();
        alert(id)

        if (this.state.usersThisBudgetIsSharedWith.length) {
        } else {
            const data = {
                budget: id,
                bills: [this.state.userChosenBudgetBills]
            }
            API.deleteBudget(data)
                .then(res => {
                    console.log(res)
                    this.loadBudgets()
                }
                )
                .catch(err => console.log(err));

        }

    }


    //Function to add user to budget
    addUserToMyBudget = (name, id) => {
        const userIDToAdd = id;
        const userSharingWithName = name;
        const budgetIDToAddTo = this.state.userChosenBudgetId;
        const budgetName = this.state.userChosenBudgetName;
        const myID = this.state.userId
        const myName = this.state.userName

        let isUserThere = this.state.allSharedBudgetWithUsers.find(i => i.user === name)
        console.log("hhhhhhh", isUserThere);

        if (isUserThere) {
            this.setState({ modalMessage: "User Already Added" })
            this.openModal()

        } else {

            const data = {
                user: userIDToAdd,   //User Im sharing with ID to push in there budgets array
                budget: budgetIDToAddTo,  // budget ID I'm sharing to push in to users budget array
                userName: userSharingWithName, //user I'm sharing with name to push to my array
                myID: myID,//my ID
                body: {
                    //Creating object for user I'm sharing with to see shared Budget and username
                    owner: myName,
                    budget: budgetName
                },
                userBody: {
                    //Creating object for user I'm sharing with to see shared Budget and username
                    user: userSharingWithName,
                    userID: userIDToAdd,
                    budget: budgetName,
                    budgetID: budgetIDToAddTo,
                    owner: myName
                },
            }
            API.shareBudget(data)
                .then(res => {
                    this.setState({
                        allSharedBudgetWithUsers: res.data.sharingBudgetWith,
                        allUsersSharingBudgetsWithMe: res.data.allUsersSharingBudgetsWithMe,
                    })
                    this.loadBudgets()
                    console.log("TTTTT", this.state.allSharedBudgetWithUsers);
                    console.log(this.state.allUsersSharingBudgetsWithMe);
                }
                )
                .then(this.cancelShowUserLookup())
                .catch(err => console.log(err));
        }
    }

    deleteSharedUser = (name, id, event) => {
        event.preventDefault();
        alert("Hi " + name + " " + id)
        const userIDToRemove = id;
        const userSharingWithName = name;
        const budgetIDToRemove = this.state.userChosenBudgetId;
        const budgetName = this.state.userChosenBudgetName;
        const myID = this.state.userId
        const myName = this.state.userName

        const data = {
            user: userIDToRemove,   //User Im sharing with ID to remove from the budgets array
            budget: budgetIDToRemove,  // budget ID I'm removing user from
            userName: userSharingWithName, //user I'm sharing with name
            myID: myID, //my ID
            body: {
                //Object that I'm removing from usersSharedBudgetWithMe
                owner: myName,
                budget: budgetName
            },
            userBodyRemove: {
                //Object that I'm removing from sharingBudgetWith Array
                user: userSharingWithName,
                userID: userIDToRemove,
                budget: budgetName,
                budgetID: budgetIDToRemove,
                owner: myName

            },
        }
        API.removeUserFromShareBudget(data)
            .then(res => {
                this.setState({
                    allSharedBudgetWithUsers: res.data.sharingBudgetWith,
                    allUsersSharingBudgetsWithMe: res.data.allUsersSharingBudgetsWithMe,
                })
                this.loadBudgets()
                console.log("TTTTT", this.state.allSharedBudgetWithUsers);
                console.log(this.state.allUsersSharingBudgetsWithMe);
            }
            )
            .then(this.cancelShowSharedUsers())
            .catch(err => console.log(err));
    }



    showAddBudget = () => {
        this.setState({
            showAddBudget: true,
            NoBudgetsNoBillsDisplay: false,
            showAddBill: false,
            editBill: false,
            showUserLookup: false,
            showSharedUsers: false
        })
    }

    showAddBill = () => {
        this.setState({
            showAddBill: true,
            showAddBudget: false,
            editBill: false,
            showUserLookup: false,
            showSharedUsers: false
        })

    }

    editBill = (id, event) => {
        event.preventDefault()
        this.setState({
            editBill: true,
            showAddBudget: false,
            showAddBill: false,
            showUserLookup: false,
            showSharedUsers: false,
            editBillID: id
        })
    }


    showUserLookup = () => {

        let user = this.state.userName;
        let findOwner = this.state.userChosenBudgetObject.userName
        console.log("yyyyyyyyyyyyyy", findOwner);

        if (this.state.userBudgets.length > 0) {
            if (user === findOwner) {
                this.setState({
                    showAddBill: false,
                    showAddBudget: false,
                    editBill: false,
                    showUserLookup: true,
                    showSharedUsers: false
                })
            } else {
                this.setState({ modalMessage: `This Budget has been Shared with you, and you cannot reshare it. Please contact the owner: ${findOwner}  if you need to add more people to this budget.` })
                this.openModal()
                // alert(`This Budget has been Shared with you, and you cannot reshare it. Please contact the owner: ${findOwner}  if you need to add more people to this budget.`)
            }
        } else {
            // alert("Add A budget First")
            // "You already have a bill by that name"
            this.setState({ modalMessage: "Add A budget First" })
            this.openModal()
        }

    }

    showSharedUsers = () => {
        this.setState({
            showAddBill: false,
            showAddBudget: false,
            editBill: false,
            showUserLookup: false,
            showSharedUsers: true
        })
    }

    showLoginPage = (event) => {
        event.preventDefault()
        this.setState({
            showSquonkGreetingPage: false,
            showLoginPage: true,
            showSignUpPage: false,            
            showHomePage: false,
        })
    }

    showSignUpPage = (event) => {
        event.preventDefault()
        this.setState({
            showSquonkGreetingPage: false,
            showLoginPage: false,
            showSignUpPage: true,
            showHomePage: false,
        })
    }

    showHomePage = (event) => {
        event.preventDefault()
        this.setState({
            showSquonkGreetingPage: false,
            showLoginPage: false,
            showSignUpPage: false,
            showHomePage: true,
        })
    }



    cancelAddBudget = () => {
        this.setState({
            showAddBudget: false,
            NoBudgetsNoBillsDisplay: true,
            budgetName: "",
            budgetPlannedAmount: "",
        })
    }

    cancelAddBill = () => {
        this.setState({
            showAddBill: false,
            billName: "",
            billPlannedAmount: "",
            billActualAmount: "",
        })
    }

    cancelEditBill = () => {
        this.setState({
            editBill: false,
            editBillName: "",
            editBillPlannedAmount: "",
            editBillActualAmount: "",
        })
    }

    cancelShowUserLookup = () => {
        this.setState({ showUserLookup: false, userToShareBudget: "", })
    }


    cancelShowSharedUsers = () => {
        this.setState({ showSharedUsers: false })
    }



    getAllUsers = () => {
        API.getUsers()
            .then(res => {
                console.log('this is res ', res);

                const allUsers = res.data.map(index => {
                    return (
                        {
                            userName: index.user,
                            userID: index.userID,
                            sharedOutBudgets: index.sharedOutBudgets,
                            sharedWithMeBudgets: index.sharedWithMe,
                        }
                    )

                })
                console.log("All Users", allUsers);
                // console.log("All the User Budgets ", this.state.userBudgets);

                this.setState({
                    allUsers: allUsers
                });

            })
            .catch(err => console.log(err));
    }
    
// Modal functions
openModal = () => {
  this.setState({ isModalOpen: true })
  setTimeout(function() { this.setState({ isModalOpen: false }); }.bind(this), 5000)
  }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

 //////////////////////
 ///End of Functions//
 /////////////////////
    
    render() {
        return (

            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} value={this.state} onClose={() => this.closeModal()}
                />
                {this.state.showSquonkGreetingPage ? (
                    <HomePage
                        state={this.state}
                        handleClick={this.showLoginPage}
                    />
                ) : (null)}

                {this.state.showLoginPage ? (
                    <LoginPage
                        handleClick={this.showHomePage}
                        handleClickSignUp={this.showSignUpPage}
                        handleChange={this.handleChange}

                    />
                ) : (null)}

                {this.state.showSignUpPage? (
                    <SignUpPage
                        handleClick={this.showSignUpPage}
                        handleChange={this.handleChange}
                        value={this.state}
                        onChange={this.getSignUpDropDownValue}
                    />
                ) : (null)}

                {this.state.showHomePage ? (
                    <React.Fragment>
                        <Navbar
                            handleClick={this.showAddBudget}
                            handleUserClick={this.showUserLookup}
                            budgetListLength={this.state.userBudgets}
                        />
                        <BudgetBar
                            budgets={this.state.userBudgets}
                            myName={this.state.userName}
                            chosenBudget={this.state.userChosenBudgetObject}
                            bills={this.state.userChosenBudgetBills}
                            handleChange={this.getSelectedValue}
                            usersIShareWith={this.state.usersThisBudgetIsSharedWith}
                            usersWhoShareWithMe={this.state.allUsersSharingBudgetsWithMe}
                            handleClick={this.showSharedUsers}
                            handleClickCancel={this.cancelShowSharedUsers}
                            handleClickDeleteBudget={this.deleteBudget}
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
                        {this.state.showSharedUsers ? (
                            <ShareUserDisplay
                                handleClickCancel={this.cancelShowSharedUsers}
                                usersIShareWith={this.state.usersThisBudgetIsSharedWith}
                                usersWhoShareWithMe={this.state.allUsersSharingBudgetsWithMe}
                                handleClick={this.deleteSharedUser}
                            />) : (false)}

                        {this.state.userBudgets.length ? (

                            <BillsDisplay
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
                            />) : (

                                this.state.NoBudgetsNoBillsDisplay ? (
                                    <NoBudgetsNoBillsDisplay userName={this.state.userName} />
                                ) : (false)
                            )}
                    </ React.Fragment>
                ) : (null)}

            </ React.Fragment>

        )
    }
}

export default Budgets;
