var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unitsSchema = new Schema({
  number: Number,
  type: String,
  status: String,
  location: String,
});

var Unit = mongoose.model('Unit', unitsSchema);

module.exports = Unit;
