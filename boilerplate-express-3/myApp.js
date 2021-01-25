var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());



//console.log("Hello World");

//app.get("/", function(req, res) {
 // res.send("Hello Express");
//});

app.get("/", function(req, res) {
  var fileName=__dirname + "/views/index.html";
  res.sendFile(fileName);
});

app.use(express.static(__dirname + "/public"));


app.use(function(req, res, next){

 var string = req.method + " " + req.path + " - " + req.ip;
 console.log(string);
 next();
});

//app.get("/json", function(req, res) {
//  res.json({
//    message: "Hello json"
//  });
//});

//app.get("/json", function(req, res) {
 // var response;
//  if (process.env.MESSAGE_STYLE == "uppercase") {
 //   response = "Hello Json".toUpperCase();
//  } else {
//    response = "Hello Json";
//  }
//  return res.json({
//    message: response
 // });
//});

app.get('/json', (req, res) => {
  let message = 'Hello json'
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    return res.json({"message": message.toUpperCase()})
  }
  return res.status(200).json({"message": message})
});

app.get("/now",  function (req, res, next){
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({
      time: req.time
    });
  });

app.get("/:word/echo",function (req, res){
  const { word } = req.params;
  res.json({
    echo: word
  });
});

//app.get("/name", function(req, res) {
 // var firstName = req.query.first;
 // var lastName = req.query.last;
  
 // res.json({
 //   name: firstName+" "+lastName
 // });
//});

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});












































 module.exports = app;
