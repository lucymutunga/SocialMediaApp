const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const { newUserValidator } = require("../validators/newUserValidator");
const { sendMail } = require("../utils/sendMail");
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
  let user = req.body;
  try {
    let { value } = await newUserValidator(user);

    let hashed_Password = await bcrypt.hash(user.password, 8);
    let sql = await mssql.connect(config);
    if (sql.connected) {
      try {
        // Check if the user already exists
        let checkQuery = `
          SELECT user_id
          FROM media.users
          WHERE user_name = @username OR email = @Email;
        `;
        let checkResults = await sql
          .request()
          .input("username", value.user_name)
          .input("Email", value.email)
          .query(checkQuery);

        if (checkResults.recordset.length > 0) {
          res.json({
            success: false,
            message: "User already exists",
          });
        } else {
          // Create the new user
          let createQuery = `
            INSERT INTO media.users (user_name, email, password, profile_pic_url, bio, country)
            VALUES (@username, @Email, @password, @ProfilePicUrl, @Bio, @Country);
          `;
          let createResults = await sql
            .request()
            .input("username", value.user_name)
            .input("Email", value.email)
            .input("password", hashed_Password)
            .input("ProfilePicUrl", user.profile_pic_url)
            .input("Bio", user.bio)
            .input("Country", user.country)
            .query(createQuery);

          res.json({
            success: true,
            message: "User created successfully",
            results: createResults.recordset,
          });
          await sendMail(user);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function userLogin(req, res) {
  const { user_name, password } = req.body;
  let sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      let result = await sql.query(
        `SELECT * From media.users WHERE user_name = '${user_name}'`
      );
      console.log(req.body);
      let user = result.recordset[0];
      console.log(result.recordset);

      if (user) {
        let passwords_match = await bcrypt.compare(password, user.password);
        if (passwords_match) {
          req.session.authorized = true;
          req.session.user = user;

          res.json({
            success: true,
            message: "Logged in successfully",
            user: user[0],
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
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
async function deleteUserAccount(req, res) {
  const { user_id } = req.params;
  let sql = await mssql.connect(config);

  if (sql.connected) {
    try {
      const result = await sql
        .request()
        .input("user_id", user_id)
        .execute("media.DeleteUserAccount");

      if (result.recordset.length > 0) {
        const message = result.recordset[0].Message;
        if (message === "User account already deleted") {
          res.json({
            success: false,
            message: message,
          });
        } else {
          res.json({
            success: true,
            message: message,
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to delete user account",
        });
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } else {
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  userLogin,
  userLogout,
  deleteUserAccount,
};
