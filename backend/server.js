///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// start the mongoose db connection
require("./config/db.connection.js");

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// import people router
const charRouter = require("./routes/characters");
const userRouter = require("./routes/users");

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router

app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

///////////////////////////////
// ROUTES
////////////////////////////////

app.use("/characters", charRouter);
app.use("/users", userRouter);

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
