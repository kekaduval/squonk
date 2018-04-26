import axios from "axios";

//userRoute  -- /api/user
//budgetRoute -- /api/budget
//billRoute -- /api/bill
export default {
  // Gets all articles
  //   getBudgets: () => {
  //     return axios.get("/api/budgets");
  //   },
  // Gets the budgets with the given id
  //   getBudgets: id => {
  //     return axios.get("/api/budgets/" + id);
  //   },
  // Deletes the budgets with the given id
  deleteBudgets: id => {
    return axios.delete("/api/budgets/" + id);
  },
  //   Saves a budgets to the database
  //   createBudget: (id, datas) => {
  //       console.log('11111122222', datas);
  //       return axios.post("/api/budget/"+ id );
  //   },
  createBudget: (body) => {
    console.log("11111122222", body);
    return axios.post("/api/budget/", {data:body});
  },

  getUsers: () => {
    return axios({
      method: "get",
      url: "/api/user"
    });
  },

  getBudgets: () => {
    return axios({
      method: "get",
      url: "/api/budget"
    });
  }
};


