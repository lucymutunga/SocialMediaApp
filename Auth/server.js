
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./src/routes/usersRoute')
const app = express();

app.use(express.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false
// }))


app.use(router)

app.get('/', (req, res) =>{
 res.send('Lets Connect!')
 })
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}!`));
