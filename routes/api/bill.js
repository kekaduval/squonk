const router = require("express").Router();
const billController = require("../../controllers/billController");

// Matches with "/api/bill"
router.route("/")
.get(billController.findAll)
// .post(billController.create);

// Matches with "/api/bills/:id"
router.route("/:id")
// .get(billController.findById)
// .put(billController.update)
// .delete(billController.remove);


module.exports = router;

