const express = require("express");
const router = express.Router();
// const { user } = require("../config/config");
// const { sessionAuth } = require("../middlewares/sessionAuth");
// const { sessionTimeout } = require("../middlewares/sessionTimeout");
const {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  userLogin,
  userLogout,
  updateUser,
  getUserProfile,
  deleteUserAccount,
} = require("../controllers/usersController");
router.get("/users", getUsers);
router.get("/users/:user_id", getUserById);
router.get("/name/:username", getUserByUsername);
router.get("/profile", getUserProfile);
router.post("/create", createUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.delete("/delete/:user_id", deleteUserAccount);
router.put("/update", updateUser);

module.exports = router;
