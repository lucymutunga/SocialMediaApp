const router = require("express").Router();
const {
  createFollower,
  getFollowers,
  deleteFollower,
  getFollowerById,
  getSuggestions,
} = require("../Controllers/followerContoller");

router.post("/follower", createFollower);
router.get("/followers", getFollowers);
router.get("/follower/:follower_id", getFollowerById);
router.get("/suggestions", getSuggestions);
router.delete("/unfollow", deleteFollower);
module.exports = router;
