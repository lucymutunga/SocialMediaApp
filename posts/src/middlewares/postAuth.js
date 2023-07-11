const { createClient } = require("redis");
async function postAuth(req, res, next) {
  const redis_Client = createClient();
  redis_Client.connect();
  redis_Client.on("connect", () => console.log("Redis connected"));
  const cookie = req.headers["cookie"];
  if (cookie) {
    console.log(cookie);
    let sessionID = cookie.substring(16, 52);
    let session = await redis_Client.get(sessionID);
    let currentsession = JSON.parse(session);
    console.log(currentsession);
    const authorized = currentsession?.authorized;
    console.log(authorized);
    if (currentsession && authorized) {
      const usersession = currentsession.user;
      req.session = usersession;
      console.log(req.session);
      next();
    } else {
      res.status(401).json({
        message: { error: "log in to continue" },
      });
    }
  }
}

module.exports = { postAuth };
