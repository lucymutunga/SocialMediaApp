const mssql = require("mssql");
const config = require("../config/config");

async function createPost(req, res) {
  // console.log("req.session:", req.session);
  // console.log("req.body:", req.body);
  const { text_content, image_url, vid_url } = req.body;
  const user_id = req.session.user_id;
  try {
    const sql = await mssql.connect(config);
    const results = await sql
      .request()

      .input("user_id", user_id)
      .input("text_content", text_content)
      .input("image_url", image_url)
      .input("vid_url", vid_url)
      .execute("media.CreatePost");

    const result = results.recordsets[0];

    res.json({
      success: true,
      message: "Post created successfully",
      postId: result,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
}
async function getPosts(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query("SELECT * FROM media.post");
    let posts = results.recordset;
    res.json({
      success: true,
      message: "Posts retrieved successfully",
      results: posts,
    });
  } else {
    res.status(500).send("Internal server error");
  }
}
async function getPostById(req, res) {
  let { post_id } = req.params;
  console.log(post_id);
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `SELECT * FROM media.post WHERE post_id = ${Number(post_id)}`
    );
    console.log(results);
    let post = results.recordset[0];
    if (results.recordsets[0].length > 0) {
      res.json({
        success: true,
        message: "Post retrieved successfully",
        results: post,
      });
    } else {
      res.json({
        success: false,
        message: "Post does not exist",
      });
    }
  }
}

//get post by user_id

async function getPostsByUserId(req, res) {
  const user_id = req.session?.user_id;

  try {
    const sql = await mssql.connect(config);
    const results = await sql
      .request()
      .input("user_id", user_id)
      .execute("media.GetPostsByUserId");

    const posts = results.recordsets[0];
    if (posts.length > 0) {
      res.json({
        success: true,
        message: "Posts retrieved successfully",
        results: posts,
      });
    } else {
      res.json({
        success: false,
        message: "Posts do not exist",
      });
    }
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
}

//  get posts from users whom the current user follows
async function getPostsFromFollowing(req, res) {
  const user_id = req.session?.user_id; // Update this to get the current user's ID

  try {
    const sql = await mssql.connect(config);
    const results = await sql
      .request()
      .input("user_id", mssql.Int, user_id) // Update the input parameter type to match your user_id data type
      .execute("media.GetFollowersPosts"); // Use the new stored procedure name

    const posts = results.recordsets[0];
    if (posts.length > 0) {
      res.json({
        success: true,
        message: "Posts retrieved successfully",
        results: posts,
      });
    } else {
      res.json({
        success: false,
        message: "Posts do not exist",
      });
    }
  } catch (error) {
    console.error("Error retrieving posts from following:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts from following",
      error: error.message,
    });
  }
}

//delete post

async function deletePost(req, res) {
  let { post_id } = req.params;
  let sql = await mssql.connect(config);

  if (sql.connected) {
    let deleteQuery = `DELETE FROM media.post WHERE post_id = ${Number(
      post_id
    )}`;
    let results = await sql.query(deleteQuery);
    console.log(results);
    if (results.rowsAffected[0] > 0) {
      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Post does not exist",
      });
    }
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getPostsByUserId,
  deletePost,
  getPostsFromFollowing,
};
