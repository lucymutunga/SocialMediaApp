require("dotenv").config();
const express = require("express");
const session = require("express-session");
const router = require("./src/routes/usersRoute");
const { v4 } = require("uuid");
const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    rolling: true,
    genid: () => v4(),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(router);
app.get("/", (req, res) => {
  res.send("Lets Connect!");
});





const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}!`));
