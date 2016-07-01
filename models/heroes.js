var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var heroSchema = new Schema({
  alias: String,
  first_name: String,
  last_name: String,
  city: String,
  power_name: {
    type: String,
    allowedValues: ['Invisibility', 'Flight', 'Super Speed', 'Heat Vision', 'Super Strength', 'Accelerated Healing', 'Power Blast', 'Animal Affinity']
  }

});

var heroes=mongoose.model('heroes', heroSchema);
module.exports=heroes;
