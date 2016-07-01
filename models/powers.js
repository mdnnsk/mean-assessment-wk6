var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var powerSchema = new Schema({
  powerId : Number,
  name : String

});

var powers=mongoose.model('powers', powerSchema);
module.exports=powers;
