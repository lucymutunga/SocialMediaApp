const express = require("express");
const router = require("./routes/followersRoute");
const cors = require("cors");
const sql = require("mssql");
const config = require("./config/config");
const { relationsAuth } = require("../middlewares/RelationsAuth");
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

    app.use(relationsAuth);
    app.use(router);
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
