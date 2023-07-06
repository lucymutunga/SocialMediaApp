const express = require("express");
const router = require("./src/routes/postsRoute");
const app =  express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started on port ${port}!`) );  
