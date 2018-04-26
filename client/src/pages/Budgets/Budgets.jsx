import React from 'react';
import AddBudget from '../../components/AddBudget';
import API from "../../utils/API";
import AddButton from "../../components/AddButton";


class Budgets extends React.Component {
  state = {
    user: "5ae141a878d938388eaf3989",
    budgetName: "",
    budgetPlannedAmount: "",
    userBudgets: [],
  };

  //Mongo user Object IDs
  //   gabe: 5ae141a878d938388eaf3989
  //   nathan: 5ae141a878d938388eaf398a
  //   keka: 5ae141a878d938388eaf398b



  //input boxes information for adding a Budget
  handleChange = event => {
    console.log("Helloooo");
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };


//   Adding a user created budget to Mongo and associating it with the user
  submitBudgetClick = () => {
  
    console.log("Budget Submitted");

     const id = this.state.user;

     const newBudget = {
       budgetName: this.state.budgetName,
       budgetPlanned: this.state.budgetPlannedAmount,
       actualAmount: this.state.budgetPlannedAmount
     };

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
//     console.log("YOOOOOO");

//          API.getUsers()
//         //  API.getBudgets()
//        .then(res => {
//             console.log(res);
//          })
//       .catch(err => console.log(err));
//   };




  render() {
    return (
      <React.Fragment>
        <div className="">
          <AddButton />
          <h1 className="">Budget Bar</h1>
        </div>

        <AddBudget handleChange={this.handleChange} value={this.state} onClick={() => this.submitBudgetClick()} />
      </React.Fragment>
    );
  }
}

export default Budgets;
