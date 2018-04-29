import axios from "axios";

//userRoute  -- /api/user
//budgetRoute -- /api/budget
//billRoute -- /api/bill
export default {
  // // Gets all articles
  //   getBudgets: () => {
  //     return axios.get("/api/budgets");
  //   },
  // // Gets the budgets with the given id
  //   getBudgets: id => {
  //     return axios.get("/api/budgets/" + id);
  //   },
  // // Deletes the budgets with the given id
  // deleteBudgets: id => {
  //   return axios.delete("/api/budget/" + id);
  // },

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
    return axios.delete("/api/bill/", data);
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


