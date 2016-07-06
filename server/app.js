var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var heroesRoute = require('../routes/heroesRoute');


var server = app.listen(4242, 'localhost', function (req, res) {
  var port = server.address().port;
  console.log('listening on ' + port);
});

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', function(req,res){
  console.log('at base url');
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use('/heroes', heroesRoute);
