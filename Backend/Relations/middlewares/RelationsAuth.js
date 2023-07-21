const { createClient } = require("redis");

async function relationsAuth(req, res, next) {
  const redisClient = createClient();
  redisClient.connect();
  redisClient.on("connect", () => console.log("Redis connected"));

  const cookie = req.headers["cookie"];

  if (cookie) {
    let sessionID = cookie.substring(16, 52);
    let session = await redisClient.get(sessionID);
    let currentSession = JSON.parse(session);

    const authorized = currentSession?.authorized;

    if (currentSession && authorized) {
      const userSession = currentSession.user;
      req.session = userSession;
      next();
    } else {
      res.status(401).json({
        message: { error: "Log in to continue" },
      });
    }
  }
}

module.exports = { relationsAuth };
