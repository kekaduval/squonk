const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");


// Matches with "/api/budgets"
router.route("/")
    .get(budgetController.findAll)
    // .post(budgetController.create)
    .post(budgetController.createBudget);

// Matches with "/api/budgets/:id"
router.route("/:id")
    .get(budgetController.findById)
//     // .put(budgetController.update)
//     // .delete(budgetController.remove);
// router.route("/:id")
// .post(budgetController.createBudget)



    

module.exports = router;

