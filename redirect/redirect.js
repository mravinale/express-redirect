var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var Client = require("node-rest-client").Client;

var app = express();
var client = new Client();

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const targetBaseUrl = "http://apidev.lupuscorner.com";
//const targetBaseUrl = 'http://localhost:3030';

const redirectHandler = (req, res) => {
  let args = {
    data: req.body,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/json",
      "x-access-token": req.headers["x-access-token"] || ""
    }
  };

  client.registerMethod(
    "jsonMethod",
    targetBaseUrl + req.originalUrl,
    req.method
  );

  client.methods.jsonMethod(args, (data, response) => {
    let status = response.status || "200";
    res.status(status).send(data);
  });
};

app.use("*", redirectHandler);

module.exports = app;
