// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'pug')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render(__dirname + '/views/index',{title:"hey",message:"message"});
});

app.post('/shorten_url/', function(request, response) {
  
  if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(request.body.input_url)){
     response.send( {"original_url":request.body.input_url,"short_url":1});
  }else
  {
     response.send( {"error":"invalid URL"});
  }
 
});

app.post('/api/shorturl/new-:input_url', function(request,response)
{
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(request.params.input_url)){
     response.send( {"original_url":request.input_url,"short_url":1});
  }else
  {
     response.send( {"error":"invalid URL"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
