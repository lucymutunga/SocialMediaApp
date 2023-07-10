const express = require("express");
const router = express.Router();
const { user } = require("../config/config");
const { sessionAuth } = require("../middlewares/sessionAuth");
const { sessionTimeout } = require("../middlewares/sessionTimeout");
const {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  userLogin,
  userLogout,
  deleteUserAccount,
} = require("../controllers/usersController");
router.get("/users", getUsers);
router.get("/users/:user_id", getUserById);
router.get("/name/:username", getUserByUsername);
router.post("/create", createUser);
router.post("/login", userLogin);
router.post("/logout", sessionAuth, userLogout);
router.delete("/delete/:user_id", deleteUserAccount);

module.exports = router;
