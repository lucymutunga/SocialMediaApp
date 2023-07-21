const { createClient } = require("redis");
async function postAuth(req, res, next) {
  const redis_Client = createClient();
  redis_Client.connect();
  redis_Client.on("connect", () => console.log("Redis connected"));
  const cookie = req.headers["cookie"];
  if (cookie) {
    let sessionID = cookie.substring(16, 52);
    let session = await redis_Client.get(sessionID);
    let currentsession = JSON.parse(session);
    const authorized = currentsession?.authorized;
    if (currentsession && authorized) {
      const usersession = currentsession.user;
      req.session = usersession;
      next();
    } else {
      res.status(401).json({
        message: { error: "log in to continue" },
      });
    }
  }
}

module.exports = { postAuth };
