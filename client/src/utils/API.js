import axios from "axios";
var qs = require('qs');

//userRoute  -- /api/user
//budgetRoute -- /api/budget
//billRoute -- /api/bill
export default {

  //so far all of these routes below this line function

  //creates a budget and sends all the users budgets back to the usersBudget state
  createBudget: data => {
    console.log("creating new budget", data);
    return axios.post("/api/budget/", data);
  },

  //creates a bill and sends all the users bills back to the usersbill state
  createBill: data => {
    console.log("creating new bill", data);
    return axios.post("/api/bill/", data);
  },

  updateBill: data => {
    console.log("updating bill", data);
    return axios.put("/api/bill/", data);
  },

  shareBudget: data => {
    console.log("users adding to budget", data);
    return axios.put("/api/user/", data);
  },

  getUserBudgets: id => {
    console.log("user id " +id )
    return axios.get("/api/user/" + id);
  },

  getBudgetBills: id => {
    // console.log("budget id" + id)
    return axios.get("/api/budget/" + id);
  },
  getBudgetObjects: id => {
    console.log("budget id capturing " + id)
    return axios.get("/api/budget/" + id);
  },

  deleteBill: data => {
    console.log("bill being deleted ", data);
    return axios.post("/api/bill/delete/", qs.stringify(data));
  },

  //Gets all users
  getUsers: () => {
    return axios({
      method: "get",
      url: "/api/user"
    });
  },

  //Gets all Budgets for everyone
  getBudgets: () => {
    return axios({
      method: "get",
      url: "/api/budget"
    });
  },

  //Gets all bills for everyone
  getBills: () => {
    return axios({
      method: "get",
      url: "/api/bill"
    });
  }
};


