//DEPENDENCIES//////////////////////////////////////
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var moment = require('moment');
var ejsLint = require('ejs-lint');
var app = express();


//PORT////////////////////////////////////////////////
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project2'

//DATABASE////////////////////////////////////////////
mongoose.connect(mongoDBURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('DB: Connected');
});

//MIDDLEWARE//////////////////////////////////////////
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));



//CONTROLLERS/////////////////////////////////////////
var unitsController = require('./controllers/unitController');
app.use('/units', unitsController);
var deliveriesController = require('./controllers/deliveryController');
app.use('/deliveries', deliveriesController);
var transactionsController = require('./controllers/transactionController');
app.use('/transactions', transactionsController);
var customersController = require('./controllers/customerController');
app.use('/customers', customersController);
var dashController = require('./controllers/dashController');
app.use('/dash', dashController);

//ROOT ROUTE//////////////////////////////////////////
app.get('/', function(req, res){
  res.redirect('/dash');
});

//LISTENER/////////////////////////////////////////////
app.listen(port, function(){
  console.log('UNITS APP RUNNING');
});
