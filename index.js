const port = 3000;
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express());
app.use(express.urlencoded({ extended: true }));

const { mongoDbConnection } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { logReqRes } = require("./middlewares/logRegister");

// Middlewares
app.use(logReqRes);

// DB Connection
const dbURL = "mongodb://127.0.0.1:27017/profile";
mongoDbConnection(dbURL);

app.use('/api/', userRoutes);

app.listen(port, () => console.log('Server started!'));