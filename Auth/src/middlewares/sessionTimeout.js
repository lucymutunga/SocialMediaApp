const { userLogout } = require("../controllers/usersController");

const sessionTimeout = (req, res, next) => {
  // Checking if the user is authenticated and the session has expired
  if (req.session.user && req.session.cookie.expires < Date.now()) {
    // Trigger the logout process
    userLogout(req, res);
  } else if (req.session.user) {
    // Update session expiration time for authenticated users
    req.session.cookie.expires = Date.now() + 1000 * 30; // 30 seconds
  }

  next();
};

module.exports = { sessionTimeout };
