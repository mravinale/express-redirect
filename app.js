var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var logger = require('morgan');
var Client = require('node-rest-client').Client;
var client = new Client();

var indexRouter = require('./routes/index');

var app = express();
// parse application/json
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use('/', indexRouter);
const targetBaseUrl = 'http://apidev.lupuscorner.com';
//const targetBaseUrl = 'http://localhost:3030';

//client.registerMethod("jsonMethod", targetBaseUrl, "GET");


function handleRedirect(req, res) {
  // res.redirect(targetBaseUrl);

  var args = {
    data:  req.body, // data passed to REST method (only useful in POST, PUT or PATCH methods)
    headers: {
      "x-access-token": req.headers["x-access-token"]
    }// request headers
  };


  client.registerMethod("jsonMethod", targetBaseUrl+req.originalUrl, req.method);

  client.methods.jsonMethod( args, function (data, response) {
    // parsed response body as js object
    console.log(data);
    res.send(data);
  });

}
app.use('*', handleRedirect);


module.exports = app;
