import React from 'react';
import Budgets from "./pages/Budgets";
import Jumbotron from "./components/Jumbotron";
import './App.css';

const App = () => (
  <React.Fragment>
    <Jumbotron />
    <Budgets />
  </React.Fragment>
);

export default App;
