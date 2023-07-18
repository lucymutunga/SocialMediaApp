const express = require("express");
const cors = require("cors");
const router = require("./src/routes/postsRoute");
const router2 = require("./src/routes/commentsRoute");
const router3 = require("./src/routes/commentReplyRoute");
const sql = require("mssql");
const config = require("./src/config/config");
const { postAuth } = require("./src/middlewares/postAuth");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const port = process.env.PORT || 3000;

const pool = new sql.ConnectionPool(config);
async function startApp() {
  try {
    await pool.connect();
    // console.log("connected to db");
    app.use(postAuth);
    app.use(router);
    app.use(router2);
    app.use(router3);
  } catch (err) {
    console.log(err);
  }
}

app.use((req, res, next) => {
  req.pool = pool;
  next();
});
app.listen(port, () => console.log(`server started on port ${port}`));

startApp();
