import React from 'react';
import "./BudgetBar.css"

class BudgetBar extends React.Component{
//   constructor(){
//     super();
//
//   this.state = {
//     users: [],
//   }
// };
//
//   componentDidMount() {
//     this.loadBudgets();
//   }
//
//   // Loads all books  and sets them to this.state.books
//   loadBudgets = () => {
//     API.getBudgets()
//       .then(res =>
//         this.setState({ users: res.data })
//       )
//       .catch(err => console.log(err));
//   };

render(){
  const image = "image"
  return (
    <React.Fragment>
    <div>
    <h1>Select a Budget</h1>
    <ul className="dropdown-menu" id="dropdown">
     <li>Nate Budget 1</li>
     <li>{image}</li>
     </ul>
    </div>
    </React.Fragment>
  )
}
}

export default BudgetBar;
