import axios from "axios";
var qs = require('qs');

//userRoute  -- /api/user
//budgetRoute -- /api/budget
//billRoute -- /api/bill
export default {
  //so far all of these routes below this line function
  createUser: data => {
    console.log("creating new user", data);
    return axios.post("/api/user/", data);
  },

  //creates a budget and sends all the users budgets back sto the usersBudget state
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

  getUserLogin: data => {
    console.log("user cred", data);
    return axios.post("/api/user/cred", data);
  },

  userUpdate: data => {
    console.log("user updates", data);
    return axios.put("/api/user/upd", data);
  },

  userUpdateSec: data => {
    console.log("user updates", data);
    return axios.put("/api/user/sec", data);
  },

  removeUserFromShareBudget: data => {
    console.log("user remove from budget", data);
    return axios.post("/api/user/share", data);
  },

  deleteUser: data => {
    console.log("delete user id", data);
    return axios.post("/api/user/delete/", data);
  },

  getUserBudgets: id => {
    console.log("user id " + id);
    return axios.get("/api/user/" + id);
  },

  getUserSecurityQuestions: id => {
    console.log("user id " + id);
    return axios.get("/api/user/sec/" + id);
  },

  getBudgetBills: id => {
    // console.log("budget id" + id)
    return axios.get("/api/budget/" + id);
  },
  getBudgetObjects: id => {
    console.log("budget id capturing " + id);
    return axios.get("/api/budget/" + id);
  },

  deleteBill: data => {
    console.log("bill being deleted ", data);
    return axios.post("/api/bill/delete/", data);
  },

  deleteMe: data => {
    console.log("User being deleted ", data);
    return axios.post("/api/user/delete/", data);
  },

  deleteAllBills: data => {
    console.log("bill being deleted ", data);
    return axios.post("/api/bill/deleteAll/", data);
  },

  deleteAllBudgets: data => {
    console.log("budget being deleted ", data);
    return axios.post("/api/budget/deleteAll/", data);
  },

  deleteBudget: data => {
    console.log("budget and bills being deleted ", data);
    return axios.post("/api/budget/delete/", qs.stringify(data));
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


