const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
.get(userController.findAll)
.post(userController.create)
.put(userController.shareBudget)

// Matches with "/api/users/:id"
router.route("/:id")
.get(userController.findById)
// .put(userController.update)
// .delete(userController.remove);


module.exports = router;

