import axios from "axios";

//userRoute  -- /api/user
//budgetRoute -- /api/budget
//billRoute -- /api/bill
export default {

    // Gets all articles
    getBudgets: () => {
        return axios.get("/api/budgets");
    },
    // Gets the budgets with the given id
    getBudgets: (id) => {
        return axios.get("/api/budgets/" + id);
    },
    // Deletes the budgets with the given id
    deleteBudgets: (id) => {
        return axios.delete("/api/budgets/" + id);
    },
    // Saves a budgets to the database
    saveBudgets: (data) => {
        console.log('11111122222', data);
        return axios.post("/api/budgets/", data);
    }

}

