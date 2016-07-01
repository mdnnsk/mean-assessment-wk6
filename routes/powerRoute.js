var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/heroes";
var MongoDB = mongoose.connect(mongoURI).connection;
var power = require ('../models/powers');

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

router.get('/', function(req,res){
  // console.log('hit the get route');
    power.find().then( function( data ){
      // console.log(data);
      res.send( data );
    });
  });
