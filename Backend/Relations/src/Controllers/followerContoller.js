module.exports = {
  createFollower: async (req, res) => {
    try {
      let { user_id } = req.body;
      let userID = req.session.user_id;
      let pool = req.pool;
      if (pool.connected) {
        console.log(pool.connected);
        let results = await pool
          .request()
          .input("user_id", user_id)
          .input("follower_id", userID)
          .execute("media.CreateFollower");
        // const result = results.recordsets[0];
        console.log(user_id);
        res.json({
          success: true,
          message: "Follower created successfully",
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
    const follower_id = req.session?.user_id;
    let { user_id } = req.body;
    try {
      const pool = req.pool;
      if (pool.connected) {
        let deleteFollower = await pool
          .request()
          .input("user_id", user_id)
          .input("follower_id", follower_id)
          .execute("media.deleteFollower");
        res.json({
          success: true,
          message: deleteFollower.recordsets[0][0].message,
          data: deleteFollower.recordsets[0],
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.number === 50002) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
  getFollowers: async (req, res) => {
    try {
      let pool = req.pool;
      let user_id = req.session.user_id;

      if (pool.connected) {
        let results = await pool
          .request()
          .input("user_id", user_id)
          .execute("media.getFollowers");
        console.log(results);

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
  getSuggestions: async (req, res) => {
    try {
      const user_id = req.session?.user_id;
      const pool = req.pool;

      if (pool.connected) {
        const results = await pool
          .request()
          .input("user_id", user_id)
          .execute("media.GetSuggestions");

        const suggestions = results.recordset;

        res.json({
          success: true,
          message: "User suggestions retrieved successfully",
          results: suggestions,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    } catch (error) {
      console.error("Error getting user suggestions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get user suggestions",
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
