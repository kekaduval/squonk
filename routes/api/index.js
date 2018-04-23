const router = require("express").Router();
const budgetRoutes = require("./budgets");

// now its /api/budgets
router.use("/budgets", budgetRoutes);


module.exports = router;
