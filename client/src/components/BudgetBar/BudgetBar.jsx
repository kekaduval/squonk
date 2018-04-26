import React from 'react';
import "./BudgetBar.css"
var Select = require('react-select');

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
    <ul className="dropdown-menu" id="dropdown">
    <li>{image}</li>
    </ul>
    </div>
    </React.Fragment>
  )
}
}

export default BudgetBar;
