/* eslint-disable no-path-concat */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const { commandsRouter, powerRouter } = require("./route");

// set up
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// route set up
app.use("/", commandsRouter);
app.use("/", powerRouter);

module.exports = {
  server: app,
};
