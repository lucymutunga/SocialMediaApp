module.exports = {
  createFollower: async (req, res) => {
    try {
      let { user_id, follower_id } = req.body;
      let pool = req.pool;
      if (pool.connected) {
        let results = await pool
          .request()
          .input("user_id", user_id)
          .input("follower_id", follower_id)
          .execute("media.CreateFollower");
        const result = results.recordsets[0];
        res.json({
          success: true,
          message: "Follower created successfully",
          followerId: result[0].follower_id,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "internal server error",
        });
      }
    } catch (error) {
      console.error("Error creating follower:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create follower",
        error: error.message,
      });
    }
  },

  deleteFollower: async (req, res) => {
    try {
      let { follower_id } = req.params;
      let pool = req.pool;
      if (pool.connected) {
        let results = await pool
          .request()
          .input("follower_id", follower_id)
          .execute("media.deleteFollower");

        if (results.rowsAffected[0] > 0) {
          res.json({
            success: true,
            message: "user unfollowed successfully",
            results: results[0],
          });
        } else {
          res.json({
            success: false,
            message: "user already unfollowed",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Follower does not exist",
        });
      }
    } catch (error) {
      console.error("Error deleting follower:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  getFollowers: async (req, res) => {
    try {
      let pool = req.pool;
      if (pool.connected) {
        let results = await pool.request().execute("media.getFollowers");
        res.json({
          success: true,
          message: "Followers retrieved successfully",
          results: results.recordsets[0],
        });
      } else {
        res.json({
          success: false,
          message: "Followers not found",
        });
      }
    } catch (error) {
      console.error("Error getting followers:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  getFollowerById: async (req, res) => {
    try {
      let { follower_id } = req.params;
      let pool = req.pool;
      if (pool.connected) {
        let results = await pool
          .request()
          .input("follower_id", follower_id)
          .execute("media.getFollowerById");

        if (results.rowsAffected[0] > 0) {
          res.json({
            success: true,
            message: "Follower retrieved successfully",
            results: results.recordsets[0],
          });
        } else {
          res.json({
            success: false,
            message: "Follower not found",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Follower not found",
        });
      }
    } catch (error) {
      console.error("Error getting follower:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
