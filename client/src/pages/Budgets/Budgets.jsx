import React from 'react';
import Navbar from '../../components/Navbar';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import BudgetBar from "../../components/BudgetBar"
import BillsDisplay from "../../components/BillsDisplay";
import UserLookup from "../../components/UserLookup"
import ShareUserDisplay from "../../components/ShareUserDisplay"
import NoBudgetsNoBillsDisplay from "../../components/NoBudgetsNoBillsDisplay"
import HomePage from '../../components/HomePage'
import LoginPage from '../../components/LoginPage'
import Modal from "../../components/Modal"
import SignUpPage from "../../components/SignUpPage"
import LoginButton from "../../components/LoginButton"
import AccountSettings from "../../components/AccountSettings"


class Budgets extends React.Component {
  state = {
    loggedIN: false,
    userId: "", //UserID
    userName: "", //Name of userlogged in
    budgetName: "", //name of Budget user creates
    budgetNameList: [], //List of Budget Name
    budgetPlannedAmount: "", //Planned Amount when user creates a budget
    currentBudgetPlannedAmount: "", //Planned Amount that will pull into the budget bar
    currentBudgetActualAmount: "", //Planned Amount that will pull into the budget bar
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
    editBillPlannedAmount: "", //edit bills planned amount
    editBillActualAmount: "", //edit bills actual amount
    billStatic: false, //User's decision if this a static planned and actual amount during bill creation
    showAddBudget: false, //keeps Add budget hidden until Add Budget is clicked
    showAddBill: false, // keeps Add Bill hidden until Add Bill is clicked
    editBill: false, // keeps edit bill hidden until a bills edit button is clicked
    showSharedUsers: false,
    editBillID: "",
    editBillObject: [],
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
    showAccountSettings: false,
    modalMessage: "",
    usernameLogin: "",
    passwordLogin: "",
    usernameCreate: "",
    usernameCreateOK: false,
    password: "",
    password2: "",
    secQuestion: "",
    secQuestionAnswer: "",
    secQuestion2: "",
    secQuestion2Answer: "",
    showSecQues: false,
    showPasswordChange: false,
    showAcctDelete: false,
    secQuestionsObject: []
  };

  componentDidMount() {
    this.getAllUsers();
    // this.loadBudgets()
  }

// Gets all the users in the db
  getAllUsers = () => {
    API.getUsers()
      .then(res => {
        console.log("this is res ", res);

        const allUsers = res.data.map(index => {
          return {
            userName: index.user,
            userID: index.userID,
            sharedOutBudgets: index.sharedOutBudgets,
            sharedWithMeBudgets: index.sharedWithMe
          };
        });
        console.log("All Users", allUsers);

        this.setState({
          allUsers: allUsers
        });
      })
      .catch(err => console.log(err));
  };

// function for user validation to see if the username and password is correct
  userLogin = event => {
    event.preventDefault();
    const users = this.state.allUsers.map(user => user.userName);
    console.log(users);

    if (!users.includes(this.state.usernameLogin)) {
      this.setState({
        modalMessage:
          "No user name found. Please check the spelling or sign up for an account."
      });
      this.openModal();
    } else {
      if (!this.state.passwordLogin.length) {
        this.setState({ modalMessage: "Please Enter a password." });
        this.openModal();
      } else {
        const user = {
          userName: this.state.usernameLogin,
          password: this.state.passwordLogin
        };
        API.getUserLogin(user)
          .then(res => {
            console.log("Logging In", res.data);
            if (res.data.userName === null && res.data.userId === null) {
              this.showLoginPage(event);
              this.setState({ modalMessage: "Password is incorrect." });
              this.openModal();
            } else {
              this.setState({
                userId: res.data.userId,
                userName: res.data.userName,
                loggedIN: true
              });
              let userIn = res.data.userId;
              this.showHomePage(event);

              if (this.state.loggedIN) {
                this.loadBudgets(userIn);
              } else {
                this.setState({ modalMessage: "Please try to log in again." });
                this.openModal();
              }
            }
          })

          .then(this.showHomePage(event))
          .catch(err => console.log(err));
      }
    }
  };

  //loads on page load. Gets all the users budgets
  loadBudgets = user => {
    const userId = this.state.userId;
    console.log("The user ID", userId);

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
        console.log(
          "all the budgets I share",
          this.state.allSharedBudgetWithUsers
        );
        console.log(
          "All budgets shared with me",
          this.state.allUsersSharingBudgetsWithMe
        );

        let userBudgetNames = this.state.userBudgets.map(budget => {
          return budget.budgetName;
        });
        this.setState({
          budgetNameList: userBudgetNames
        });

        if (this.state.userBudgets.length > 0) {
          this.userFirstBudget();
        } else {
        }
      })
      .catch(err => console.log(err));
  };

  //grabs the first user budget to load bills
  userFirstBudget = () => {
    this.setState({
      userChosenBudgetName: this.state.userBudgets[0].budgetName,
      userChosenBudgetId: this.state.userBudgets[0]._id,
      currentBudgetPlannedAmount: this.state.userBudgets[0].budgetPlannedAmount,
      currentBudgetActualAmount: this.state.userBudgets[0].actualAmount,
      userChosenBudgetObject: this.state.userBudgets[0]
    });
    console.log("User chosen budget is ", this.state.userChosenBudgetObject);
    this.userBudgetBillsID();
    this.getThisBudgetSharedUsers();
  };

  // Function that grabs all the users shared budgets
  getThisBudgetSharedUsers = () => {
    console.log(
      "This is all my Shared Users and Budgets ",
      this.state.allSharedBudgetWithUsers
    );
    console.log(
      "This is the current budget ID ",
      this.state.userChosenBudgetId
    );
    let sharedUsersThisBudget = this.state.allSharedBudgetWithUsers.filter(
      i => i.budgetID === this.state.userChosenBudgetId
    );
    this.setState({
      usersThisBudgetIsSharedWith: sharedUsersThisBudget
    });

    console.log("Shared users only for this budget", sharedUsersThisBudget);
    console.log(
      "This is the users in this budget state ",
      this.state.usersThisBudgetIsSharedWith
    );
  };

  //grabs all the bills associated with the chosen budget
  userBudgetBillsID = () => {
    const budgetId = this.state.userChosenBudgetId;
    console.log(budgetId);
    API.getBudgetBills(budgetId)
      .then(res => {
        this.setState({
          userChosenBudgetBills: res.data.bills
        });
      })
      .catch(err => console.log(err));
  };

  //input boxes information for adding a Budget
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);

    console.log("YYYYYUUUUUUUU", this.state.usernameCreate);
    console.log("YYYYYGGGGGGGGG", this.state.password);
  };

  //input boxes information for adding a Budget
  editHandleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //creating a budget, tieing it to a user and updating all users budget state
  submitBudgetClick = () => {

    const newBudget = {
      userId: this.state.userId,
      userName: this.state.userName,
      budgetName: this.state.budgetName,
      budgetPlannedAmount: this.state.budgetPlannedAmount,
      actualAmount: 0
    };
    API.createBudget(newBudget)
      .then(res => {
        console.log("UUUUUUUUUUUUUUUUUU", res);

        this.setState({
          userBudgets: res.data
        });
        this.loadBudgets();
      })
      .then(
        this.setState({
          showAddBudget: false,
          budgetName: "",
          budgetPlannedAmount: ""
        })
      )
      .catch(err => console.log(err));
  };

  //creating a bill, tieing it to a users budget and updating all users bills state
  submitBillClick = () => {
    const userPotentialBillName = this.state.billName;
    const matchBillName = this.state.userChosenBudgetBills.find(
      i => i.billName === userPotentialBillName
    );
    if (matchBillName) {
      this.setState({ modalMessage: "You already have a bill with that name." });
      this.openModal();
    } else {
      const newBill = {
        userId: this.state.userId,
        userName: this.state.userName,
        budgetId: this.state.userChosenBudgetId,
        budgetName: this.state.userChosenBudgetName,
        billName: this.state.billName,
        billPlannedAmount: this.state.billPlannedAmount,
        billActualAmount: this.state.billActualAmount
          ? this.state.billActualAmount
          : 0.0,
        billStatic: this.state.billStatic
      };
      API.createBill(newBill)
        .then(res => {
          this.setState({
            userBills: res.data
          });
          this.userBudgetBillsID();
        })
        .then(
          this.setState({
            showAddBill: false,
            billName: "",
            billPlannedAmount: "",
            billActualAmount: ""
          })
        )
        .catch(err => console.log(err));
    }
  };

  // updating a bill, tieing it to a users budget and updating all users bills state
  updateBillClick = event => {
    const updateBill = {
      billId: this.state.editBillID,
      body: {
        userId: this.state.userId,
        userName: this.state.userName,
        budgetId: this.state.userChosenBudgetId,
        budgetName: this.state.userChosenBudgetName,
        billName: this.state.editBillName
          ? this.state.editBillName
          : this.state.editBillObject.billName,
        billPlannedAmount: this.state.editBillPlannedAmount
          ? this.state.editBillPlannedAmount
          : this.state.editBillObject.billPlannedAmount,
        billActualAmount: this.state.editBillActualAmount
          ? this.state.editBillActualAmount
          : this.state.editBillObject.billActualAmount,
        billStatic: this.state.billStatic
      }
    };
    API.updateBill(updateBill)
      .then(res => {
        this.setState({
          userBills: res.data
        });
        console.log(this.state.userBills);
        this.userBudgetBillsID();
      })
      .then(
        this.setState({
          editBill: false,
          editBillName: "",
          editBillPlannedAmount: "",
          editBillActualAmount: ""
        })
      )
      .catch(err => console.log(err));
  };

  // This is the function that gets the selected value from the dropdown ?????????
  getSelectedValue = event => {
    event.preventDefault();
    var x = event.target.selectedIndex;
    let selectedValue = event.target.options[x].dataset.id;
    console.log("The new ID should be:" + selectedValue);
    let chosenBudgetObject = this.state.userBudgets.find(
      i => i._id === selectedValue
    );
    this.setState({ userChosenBudgetId: selectedValue });

    API.getBudgetBills(selectedValue)
      .then(res => {
        this.setState({
          userChosenBudgetBills: res.data.bills,
          userChosenBudgetObject: chosenBudgetObject
        });
        console.log(
          "The chosen budget object is ",
          this.state.userChosenBudgetObject
        );
        this.getThisBudgetSharedUsers();
        this.cancelShowSharedUsers();
      })
      .catch(err => console.log(err));
  };

  deleteBill = (id, event) => {
    console.log("deletebillid " + id);
    event.preventDefault();
    const data = {
      billId: id,
      budgetId: this.state.userChosenBudgetId
    };
    API.deleteBill(data)
      .then(res => console.log(res))
      .then(this.loadBudgets())
      .catch(err => console.log(err));
  };

  deleteBudget = (id, event) => {
    event.preventDefault();
    if (this.state.usersThisBudgetIsSharedWith.length > 0) {
      this.setState({ modalMessage: "This is a shared budget. Please remove all shared with users before deletion." });
      this.openModal();
    } else {
      const data = {
        user: this.state.userId,
        budget: id
        // bills: [this.state.userChosenBudgetBills]
      };
      API.deleteBudget(data)
        .then(res => {
          console.log(res.data);
          this.loadBudgets();
        })
        .catch(err => console.log(err));
    }
  };

  // deletes user account and calls three functions 1. delete all bills 2. delete all budgets 3. remove user
  deleteAccount = (id, budget, event) => {
    event.preventDefault();

    if (this.state.allSharedBudgetWithUsers.length > 0) {
      this.state.allSharedBudgetWithUsers.forEach(user => {
        this.deleteSharedUser(user.user, user.userID, user.budgetID, event);
      });
    }

    if (this.state.userBudgets.length > 0) {
      let budgets = this.state.userBudgets;
      budgets.forEach(bud => {
        this.deleteAllBills(bud._id, event);
      });
    }

    if (this.state.userBudgets.length > 0) {
      let budgets = this.state.userBudgets;
      budgets.forEach(bud => {
        this.deleteAllBudgets(bud._id, event);
      });
    }

    this.removeUser()
  };

  //deletes all bill associated with user
  deleteAllBills = (budget, event) => {
    const data = {
      budgetID: budget
    };
    API.deleteAllBills(data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  //deletes all budgets associated with user
  deleteAllBudgets = (budget, event) => {
    const data = {
      budgetID: budget
    };
    API.deleteAllBudgets(data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  //deletes the user object
  removeUser = () => {
    const user = {user: this.state.userId}
    API.deleteMe(user)
      .then(res => {
        this.setState({ modalMessage: "GoodBye" });
        this.openModal();
        this.setState({
       showSquonkGreetingPage: true,
       showLoginPage: false,
       showSignUpPage: false,
       showHomePage: false,
       loggedIN: false,
       userId: "",
       userName: ""
     })
      })
      .catch(err => console.log(err));
  }

  //Function to add user to budget
  addUserToMyBudget = (name, id) => {
    const userIDToAdd = id;
    const userSharingWithName = name;
    const budgetIDToAddTo = this.state.userChosenBudgetId;
    const budgetName = this.state.userChosenBudgetName;
    const myID = this.state.userId;
    const myName = this.state.userName;

    let isUserThere = this.state.usersThisBudgetIsSharedWith.find(
      i => i.user === name
    );

    console.log("hhhhhhh", isUserThere);

    if (isUserThere) {
      this.setState({ modalMessage: "User Already Added." });
      this.openModal();
    } else {
      const data = {
        user: userIDToAdd, //User Im sharing with ID to push in there budgets array
        budgetID: budgetIDToAddTo, // budget ID I'm sharing to push in to users budget array
        userName: userSharingWithName, //user I'm sharing with name to push to my array
        myID: myID, //my ID
        body: {
          //Creating object for user I'm sharing with to see shared Budget and username, goes under shared user.[UsersSharingBudgetWithMe]
          owner: myName,
          budgetName: budgetName,
          budgetID: budgetIDToAddTo
        },
        userBody: {
          //Creating object for user I'm sharing with to see shared Budget and username, goes under owner [SharingBudgetWith]
          user: userSharingWithName,
          userID: userIDToAdd,
          budgetName: budgetName,
          budgetID: budgetIDToAddTo,
          owner: myName
        }
      };
      API.shareBudget(data)
        .then(res => {
          this.setState({
            allSharedBudgetWithUsers: res.data.sharingBudgetWith,
            allUsersSharingBudgetsWithMe: res.data.allUsersSharingBudgetsWithMe
          });
          this.loadBudgets();
          console.log("TTTTT", this.state.allSharedBudgetWithUsers);
          console.log(this.state.allUsersSharingBudgetsWithMe);
        })
        .then(this.cancelShowUserLookup())
        .catch(err => console.log(err));
    }
  };

  // function to remove a shared user from a budget
  deleteSharedUser = (name, id, budget, event) => {
    event.preventDefault();
    this.setState({ modalMessage: "Shared User removed from budget." });
    this.openModal();
    const userIDToRemove = id;
    const userSharingWithName = name;
    const budgetIDToRemove = budget;
    const budgetName = this.state.userChosenBudgetName;
    const myID = this.state.userId;
    const myName = this.state.userName;

    const data = {
      user: userIDToRemove, //User Im sharing with ID to remove from the budgets array
      budgetID: budgetIDToRemove, // budget ID I'm removing user from
      userName: userSharingWithName, //user I'm sharing with name
      myID: myID, //my ID
      body: {
        owner: myName,
        budgetName: budgetName,
        budgetID: budgetIDToRemove
      },
      userBodyRemove: {
        //Object that I'm removing from sharingBudgetWith Array,  goes under owner [SharingBudgetWith]
        user: userSharingWithName,
        userID: userIDToRemove,
        budgetName: budgetName,
        budgetID: budgetIDToRemove,
        owner: myName
      }
    };
    API.removeUserFromShareBudget(data)
      .then(res => {
        this.setState({
          allSharedBudgetWithUsers: res.data.sharingBudgetWith,
          allUsersSharingBudgetsWithMe: res.data.allUsersSharingBudgetsWithMe
        });
        this.loadBudgets();
        console.log("TTTTT", this.state.allSharedBudgetWithUsers);
        console.log(this.state.allUsersSharingBudgetsWithMe);
      })
      .then(this.cancelShowSharedUsers())
      .catch(err => console.log(err));
  };

//Function to show add budget button
  showAddBudget = () => {
    this.setState({
      showAddBudget: true,
      NoBudgetsNoBillsDisplay: false,
      showAddBill: false,
      editBill: false,
      showUserLookup: false,
      showSharedUsers: false
    });
  };

// //Function to show add bill button
  showAddBill = () => {
    this.setState({
      showAddBill: true,
      showAddBudget: false,
      editBill: false,
      showUserLookup: false,
      showSharedUsers: false
    });
  };

// function to edit a bill
  editBill = (id, event) => {
    event.preventDefault();
    let billClick = id;
    let billObject = "";
    let billInfo = this.state.userChosenBudgetBills.map(index => {
      index._id === id;
      billObject = index;
    });
    console.log("Gothimmmmmm" + billClick);
    console.log("Gothimmmmmm22222", billObject);
    this.setState({
      editBill: true,
      showAddBudget: false,
      showAddBill: false,
      showUserLookup: false,
      showSharedUsers: false,
      editBillID: id,
      editBillObject: billObject
    });
    console.log("The edit bill object", this.state.editBillObject);
  };

// function to show the user you are looking for to share with
  showUserLookup = () => {
    let user = this.state.userName;
    let findOwner = this.state.userChosenBudgetObject.userName;
    if (this.state.userBudgets.length > 0) {
      if (user === findOwner) {
        this.setState({
          showAddBill: false,
          showAddBudget: false,
          editBill: false,
          showUserLookup: true,
          showSharedUsers: false
        });
      } else {
        this.setState({
          modalMessage: `This Budget has been Shared with you, and you cannot reshare it. Please contact the owner: ${findOwner}  if you need to add more people to this budget.`
        });
        this.openModal();
      }
    } else {
      this.setState({ modalMessage: "Add A budget First" });
      this.openModal();
    }
  };

// Function to sign out user
  signOut = event => {
    event.preventDefault();
    this.setState({
      showSquonkGreetingPage: true,
      showLoginPage: false,
      showSignUpPage: false,
      showHomePage: false,
      loggedIN: false,
      userId: "",
      userName: ""
    });
  };

// function to change password
  changePassword = event => {
    if (this.state.password === this.state.password2) {
      const newPass = {
        id: this.state.userId,
        password: this.state.password
      };

      API.userUpdate(newPass)
        .then(res => {
          this.setState({
            password: "",
            password2: ""
          });
          console.log(res.data);
        })
        .then(this.signOut(event))
        .catch(err => console.log(err));
    } else {
      this.setState({ modalMessage: "Passwords are not the same." });
      this.openModal();
    }
  };

// function to change security questions
  changeSecQuestions = event => {
    event.preventDefault();

    const newSecQuestions = {
      id: this.state.userId,
      secQuestion1: this.state.secQuestion
        ? this.state.secQuestion
        : this.state.secQuestionsObject.secQuestion1,
      secQuestion1Answer: this.state.secQuestionAnswer
        ? this.state.secQuestionAnswer
        : this.state.secQuestionsObject.secQuestion1Answer,
      secQuestion2: this.state.secQuestion2
        ? this.state.secQuestion2
        : this.state.secQuestionsObject.secQuestion2,
      secQuestion2Answer: this.state.secQuestion2Answer
        ? this.state.secQuestion2Answer
        : this.state.secQuestionsObject.secQuestion2Answer
    };
    API.userUpdateSec(newSecQuestions)
      .then(res => {
        this.setState({
          secQuestion: "",
          secQuestionAnswer: "",
          secQuestion2: "",
          secQuestion2Answer: "",
          secQuestionsObject: []
        });
        console.log(res.data);
        this.setState({ modalMessage: "Security Questions Updated" });
        this.openModal();
        this.cancelShowSecQues();
      })
      .catch(err => console.log(err));
  };

// function to show shared users
  showSharedUsers = () => {
    this.setState({
      showAddBill: false,
      showAddBudget: false,
      editBill: false,
      showUserLookup: false,
      showSharedUsers: true
    });
  };

// function to show the login page
  showLoginPage = event => {
    event.preventDefault();
    this.setState({
      showSquonkGreetingPage: false,
      showLoginPage: true,
      showSignUpPage: false,
      showHomePage: false
    });
  };

// function to show the sign in page
  showSignUpPage = event => {
    event.preventDefault();
    this.setState({
      showSquonkGreetingPage: false,
      showLoginPage: false,
      showSignUpPage: true,
      showHomePage: false
    });
  };

// function to show the home page
  showHomePage = event => {
    event.preventDefault();
    this.setState({
      showSquonkGreetingPage: false,
      showLoginPage: false,
      showSignUpPage: false,
      showHomePage: true
    });
  };

// function to show the account settings page
  showAcctSettings = () => {
    this.setState({
      showSquonkGreetingPage: false,
      showLoginPage: false,
      showSignUpPage: false,
      showHomePage: false,
      showAccountSettings: true
    });
  };

// function to cancel adding a budget
  cancelAddBudget = () => {
    this.setState({
      showAddBudget: false,
      NoBudgetsNoBillsDisplay: true,
      budgetName: "",
      budgetPlannedAmount: ""
    });
  };

// Function to cancel adding a bill
  cancelAddBill = () => {
    this.setState({
      showAddBill: false,
      billName: "",
      billPlannedAmount: "",
      billActualAmount: ""
    });
  };

// function to cancel editing a bill
  cancelEditBill = () => {
    this.setState({
      editBill: false,
      editBillName: "",
      editBillPlannedAmount: "",
      editBillActualAmount: ""
    });
  };

// cancel looking up a user
  cancelShowUserLookup = () => {
    this.setState({ showUserLookup: false, userToShareBudget: "" });
  };

// cancel show the shared users
  cancelShowSharedUsers = () => {
    this.setState({ showSharedUsers: false });
  };

  // cancel show the account settings
  cancelShowAcctSettings = () => {
    this.setState({
      showSquonkGreetingPage: false,
      showLoginPage: false,
      showSignUpPage: false,
      showHomePage: true,
      showAccountSettings: false,
      showSecQues: false,
      showPasswordChange: false
    });
  };

// Show the security questions
  showSecQues = () => {
    const id = this.state.userId;
    API.getUserSecurityQuestions(id)
      .then(res => {
        this.setState({
          showSecQues: true,
          showPasswordChange: false,
          showAcctDelete: false,
          secQuestionsObject: res.data
        });
      })
      .catch(err => console.log(err));
  };

// Show the password change
  showPasswordChange = () => {
    this.setState({
      showSecQues: false,
      showPasswordChange: true,
      showAcctDelete: false
    });
  };

// Show account deletion
  showAcctDelete = () => {
    this.setState({
      showSecQues: false,
      showPasswordChange: false,
      showAcctDelete: true
    });
  };

//  Cancel show security questions
  cancelShowSecQues = () => {
    this.setState({
      showSecQues: false
    });
  };

// Cancel the show password change
  cancelShowPasswordChange = () => {
    this.setState({
      showPasswordChange: false,
      password: "",
      password2: ""
    });
  };

// cancel account deletion
  cancelAcctDelete = () => {
    this.setState({
      showAcctDelete: false
    });
  };

  //Checking to see if the username is already in the database
  userNameCheck = event => {
    let userToBe = this.state.allUsers.map(user => user.userName);
    const { name, value } = event.target;
    this.setState({
      usernameCreate: value
    });
    console.log(this.state.username);
    if (
      event.target.value.length >= 3 &&
      userToBe.includes(event.target.value)
    ) {
      this.setState({
        usernameCreateOK: true
      });
    } else {
      this.setState({
        usernameCreateOK: false
      });
    }
  };

  //creation of user and push back to the login screen
  createUser = () => {
    if (
      this.state.usernameCreate &&
      this.state.usernameCreateOK === false &&
      this.state.password &&
      this.state.password2 &&
      this.state.secQuestion &&
      this.state.secQuestion2
    ) {
      if (this.state.password !== this.state.password2) {
        this.setState({ modalMessage: "Passwords do not match" });
        this.openModal();
      } else {
        const newUser = {
          userName: this.state.usernameCreate.toLowerCase(),
          password: this.state.password,
          secQuestion1: this.state.secQuestion,
          secQuestion1Answer: this.state.secQuestionAnswer.toLowerCase(),
          secQuestion2: this.state.secQuestion2,
          secQuestion2Answer: this.state.secQuestion2Answer.toLowerCase()
        };
        API.createUser(newUser)
          .then(res => {
            console.log("USER CREATED", res);
            this.setState({
              usernameCreate: "",
              password: "",
              password2: "",
              secQuestion: "",
              secQuestionAnswer: "",
              secQuestion2: "",
              secQuestion2Answer: ""
            });
            this.setState({ modalMessage: "Account Created." });
            this.openModal();
            this.showLoginPage(this.event);
          })
          .catch(err => console.log(err));
      }
    } else {
      this.setState({ modalMessage: "Fill in all boxes." });
      this.openModal();
    }
  };

  // Modal functions
  // Function to open the modal
  openModal = () => {
    this.setState({ isModalOpen: true });
    setTimeout(
      function() {
        this.setState({ isModalOpen: false });
      }.bind(this),
      5000
    );
  };

  // Function to close the modal
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  //////////////////////
  ///End of Functions//
  /////////////////////

  render() {
    console.log("USER BUDGETS", this.state.userBudgets);

    return (


      <React.Fragment>


      {this.state.isModalOpen ? (
        <Modal

          value={this.state}
          onClose={this.closeModal}
        />):(null)}


        {this.state.showSquonkGreetingPage ? (
          <HomePage state={this.state} handleClick={this.showLoginPage} />
        ) : null}
        {this.state.showLoginPage ? (
          <LoginPage
            handleClick={this.userLogin}
            handleClickSignUp={this.showSignUpPage}
            handleChange={this.handleChange}
            value={this.state}
          />
        ) : null}
        {this.state.showSignUpPage ? (
          <SignUpPage
            handleClick={this.createUser}
            handleChange={this.handleChange}
            value={this.state}
            onChange={this.getSignUpDropDownValue}
            handleClickSubmit={this.createUser}
            usernameCheck={this.userNameCheck}
          />
        ) : null}
        {this.state.showHomePage && this.state.loggedIN ? (
          <React.Fragment>
            <Navbar
              handleClick={this.showAddBudget}
              handleUserClick={this.showUserLookup}
              budgetListLength={this.state.userBudgets}
              handleClickSignOut={this.signOut}
              handleClickAcct={this.showAcctSettings}
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
              />
            ) : (
              false
            )}
            {this.state.showUserLookup ? (
              <UserLookup
                handleChange={this.handleChange}
                value={this.state}
                handleClick={this.addUserToMyBudget}
                allUsers={this.state.allUsers}
                userToShareBudget={this.state.userToShareBudget}
                handleClickCancel={this.cancelShowUserLookup}
              />
            ) : (
              false
            )}
            {this.state.showSharedUsers ? (
              <ShareUserDisplay
                handleClickCancel={this.cancelShowSharedUsers}
                usersIShareWith={this.state.usersThisBudgetIsSharedWith}
                usersWhoShareWithMe={this.state.allUsersSharingBudgetsWithMe}
                handleClick={this.deleteSharedUser}
                value={this.state}
              />
            ) : (
              false
            )}

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
              />
            ) : this.state.NoBudgetsNoBillsDisplay ? (
              <NoBudgetsNoBillsDisplay userName={this.state.userName} />
            ) : (
              false
            )}
          </React.Fragment>
        ) : null
        // <div className='container text-center notLoggedin'>
        //     <p>Please Log in to use Squonk</p>
        //     <LoginButton
        //         handleClick={this.showLoginPage} />
        // </div>
        }
        {this.state.showAccountSettings && this.state.loggedIN ? (
          <AccountSettings
            handleClickCancel={this.cancelShowAcctSettings}
            handleClickSec={this.showSecQues}
            handleClickPass={this.showPasswordChange}
            handleClickCancelSec={this.cancelShowSecQues}
            handleClickCancelPass={this.cancelShowPasswordChange}
            handleClickAcctDelete={this.showAcctDelete}
            handleClickCancelAcctDelete={this.cancelAcctDelete}
            handleChange={this.handleChange}
            handleClickSubmitPass={this.changePassword}
            handleClickSubmitSecQuestions={this.changeSecQuestions}
            handleClickDeleteAcct={this.deleteAccount}
            handleClickSignOut={this.signOut}
            value={this.state}
          />
        ) : null}s
      </React.Fragment>
    );
  }
}

export default Budgets;
