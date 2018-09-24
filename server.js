// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

mongoose.connect(`mongodb://anhngoc92:anhngocyeuhoanghien2010@ds213183.mlab.com:13183/freecodecamp`,{ useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error: ' + err)
       })
var shortenUrlModel = require('./models/shortenUrl');
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

app.post('/api/shorturl/new/:input_url(*)', function(request,response)
{
  var original_url = request.params.new;
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-  Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  
  
   if (/((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(request.params.input_url)){
     
     response.send( {"original_url":request.params.input_url,"short_url":1});
     //response.send( {"error":"accept"});
  }else
  {
     response.send( {"error":"invalid URL"});
  }
  
});


app.post('/api/sshorten_url/:id', function(request, response) {
  
  shortenUrlModel.Find({
    _id: request.params.id   // search query
  }) .then(doc => {
    response.send( {"doc":doc});
  })
  .catch(err => {
    response.send( {"error":"invalid URL"});
  });
 
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
