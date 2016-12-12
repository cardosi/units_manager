var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  type: String,
  name: String,
  business: String,
  phone: Number,
  email: String,
  address: String,
  containers: [],
  deliveries: [],
  transactions: [],
  payment_method: String,
  communications: []
});

var Customer = mongoose.model('Customer', customerSchema);

mondule.exports = Customer;
