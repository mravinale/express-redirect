var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var Client = require("node-rest-client").Client;

var app = express();
var client = new Client();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const targetBaseUrl = "http://apidev.lupuscorner.com";
const targetBaseUrl = "http://localhost:8080";

const redirectHandler = (req, res) => {
  let args = {
    data: req.body,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/json",
      "x-access-token": req.headers["x-access-token"] || ""
    }
  };

  client.registerMethod(
    "redirect",
    targetBaseUrl + req.originalUrl,
    req.method
  );

  client.methods.redirect(args, (data, response) => {
    let status = response.status || response.statusCode || "500";
    res.status(status).send(data);
  });
};

app.use("*", redirectHandler);

module.exports = app;
