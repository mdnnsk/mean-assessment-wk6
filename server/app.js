var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/heroes";
var MongoDB = mongoose.connect(mongoURI).connection;
var hero = require ('../models/heroes');


MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var server = app.listen(8080, 'localhost', function (req, res) {
  var port = server.address().port;
  console.log('listening on ' + port);
});

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', function(req,res){
  console.log('at base url');
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/', function(req,res){
  console.log('at base url');
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/heroes', function(req,res){
  // console.log('hit the get route');
    hero.find().then( function( data ){
      // console.log(data);
      res.send( data );
    });
  });

app.post('/heroes', function(req,res){
  // console.log('hit heroes post');
  // console.log(req.body);
  var sendHero = new hero ({
      alias: req.body.alias,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      power_name: req.body.power_name
  });
  sendHero.save(function(err){
    if (err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('hero saved succesfully');
      res.sendStatus(200);
    }
  });
});
