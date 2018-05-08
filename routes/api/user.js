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

router.route("/share/")
.post(userController.removeSharedUser)

router.route("/cred/")
.post(userController.findLogin)




module.exports = router;

