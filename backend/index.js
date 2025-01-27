require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;

const connectMongoDB = require("./src/db/connectMongoDB");

const userRouter = require("./src/routers/userRouter");
const ticketRouter = require("./src/routers/ticketRouter");

//error handler
const handleError = require("./src/utils/errorHandler");

app.use(helmet()); //api security
app.use(cors()); //handle cors error

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user routers
app.use("/v1/user", userRouter);
//ticket routers
app.use("/v1/ticket", ticketRouter);

app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    handleError(error, res);
});

app.listen(port, () => {
    console.log(`API is working on http://localhost:${port}`);
    connectMongoDB();
});
