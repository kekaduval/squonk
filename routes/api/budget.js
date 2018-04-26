const router = require("express").Router();
const budgetController = require("../../controllers/budgetController");


// Matches with "/api/budgets"
router.route("/")
    .get(budgetController.findAll)
    // .post(budgetController.createBudget)
    .post(budgetController.create);

// Matches with "/api/budgets/:id"
// router.route("/:id")
    // .get(budgetController.findById)
    // .put(budgetController.update)
    // .delete(budgetController.remove);
router.route("/:id/:body")
.post(budgetController.createBudget)


module.exports = router;

