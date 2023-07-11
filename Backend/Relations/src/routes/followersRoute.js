const router = require("express").Router();
const {
  createFollower,
  getFollowers,
  deleteFollower,
  getFollowerById,
} = require("../Controllers/followerContoller");

router.post("/follower", createFollower);
router.get("/followers", getFollowers);
router.get("/follower/:follower_id", getFollowerById);
router.delete("/follower/:follower_id", deleteFollower);
module.exports = router;
