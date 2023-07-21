require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const { sessionTimeout } = require("./src/middlewares/sessionTimeout");
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;
// const { sessionAuth } = require("./src/middlewares/sessionAuth");
const router = require("./src/routes/usersRoute");
const { v4 } = require("uuid");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const redis_Client = createClient();
redis_Client.connect();
redis_Client.on("connect", () => console.log("Redis connected"));

const redisStore = new RedisStore({ client: redis_Client, prefix: "" });

app.use(
  session({
    store: redisStore,
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    genid: () => v4(),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: Date.now() + 1000 * 60 * 30, // 30 minutes
      // maxAge: 1000 * 30, // 30 seconds
    },
  })
);
// app.use(sessionTimeout);

app.use(router);
app.get("/", (req, res) => {
  res.send("Lets Connect!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
