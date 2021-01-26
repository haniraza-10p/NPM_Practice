// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//solution
app.get("/api/timestamp/:input", function (req, res) {
  const dateinput = req.params.input;
  let date;
  if(!dateinput){
    date = new Date();
  }
  else {
    if(!isNaN(dateinput)){
      //console.log(dateinput);
      date = new Date(parseInt(dateinput));
      //console.log(date);
    } 
    else {
      //console.log(dateinput);
      var newdate = dateinput.split("-");
      date = new Date(newdate[0], newdate[1] - 1, newdate[2]);
      //console.log(date);
      if (date.toString() === 'Invalid Date') {
        date = new Date(dateinput);
      }
      //console.log(date);
    }
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: date.toString() });
  } 
  else  {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.get("/api/timestamp", function (req, res) {
  var date = new Date();
  //console.log("Hello 1");
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
