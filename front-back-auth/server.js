const express = require('express');
const ConnectDB = require('./helpers/ConnectDB');

const app = express();
//Connect to DB
ConnectDB();

//middlewares
app.use(express.json());

//Define routes
app.use("/register", require('./routes/register'));
app.use("/login", require('./routes/login'));
app.use("/post", require('./routes/post'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port: ${PORT}`))

