const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
async function getUsers(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query("SELECT * FROM media.users");
    let users = results.recordset;
    res.json({
      success: true,
      message: "users retrieved successfully",
      results: users,
    });
  } else {
    res.status(500).send("Internal server error");
  }
}

async function getUserById(req, res) {
  let { user_id } = req.params;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `SELECT * FROM media.users WHERE user_id = ${Number(user_id)}`
    );
    let user = results.recordset;
    res.json({
      success: true,
      message: "user retrieved successfully",
      results: user,
    });
  }
}

async function getUserByUsername(req, res) {
  let { username } = req.params;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `SELECT * FROM media.users WHERE user_name = '${username}'`
    );
    let user = results.recordset;
    if (user.length > 0) {
      res.json({
        success: true,
        message: "User retrieved successfully",
        user: user[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  }
}

async function createUser(req, res) {
  let sql = await mssql.connect(config);

  let user = req.body;
  let hashed_Pwd = await bcrypt.hash(user.password, 8);
  if (sql.connected) {
    let results = await sql
      .request()
      .input("username", user.user_name)
      .input("Email", user.email)
      .input("Password", hashed_Pwd)
      .input("ProfilePicUrl", user.profile_pic_url)
      .input("Bio", user.bio)
      .input("Country", user.country)
      .execute("media.CreateUser");
    res.json({
      success: true,
      message: "user created successfully",
      results: results[0],
    });
  } else {
    res.status(500).send("Internal server error");
  }
}

async function userLogin(req, res) {
  const { user_name, password } = req.body;
  let sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      let result = await sql.query(
        `SELECT user_name, password FROM media.users WHERE user_name = '${user_name}'`
      );
        console.log(req.body);
      let user = result.recordset[0];
      console.log(result.recordset );

      if (user) {
        let passwords_match = await bcrypt.compare(password, user.password);
        if (passwords_match) {
          req.session.authorized = true;
          req.session.user = user;
          console.log(req.session);
          
            res.json({
              success: true,
              message: " logged in successfully",
              user: user[0],
            });
          } else {
            res.status(404).json({
              success: false,
              message: "User not found",
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

       

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
        error: error.message,
      });
    }

  }
}



function userLogout(req, res) {
  console.log(req.session);
  req.session.destroy();
  res.json({
    success: true,
    message: "logged out successfully",
  });
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  userLogin,
  userLogout,
};