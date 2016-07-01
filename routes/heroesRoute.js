var express = require('express');
var path = require('path');
var router = express.Router();
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

router.get('/', function(req,res){
  // console.log('hit the get route');
    hero.find().then( function( data ){
      // console.log(data);
      res.send( data );
    });
  });

router.post('/', function(req,res){
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

router.delete('/', function(req,res){
  console.log('deleting hero');
  hero.findOne({_id: req.body.id}, function (err, userResult){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }else{
      hero.remove({_id:userResult._id}, function(err) {});
      res.sendStatus(200);
    }
  });
});


module.exports = router;
