const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router
  .route("/users")
  .post(userController.createUser)
  .get(userController.getUsers);
  
router.route("/users/:id").delete(userController.deleteUser)
router.route("/users/search").get(userController.searchUsers);
module.exports = router;
