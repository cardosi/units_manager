//DEPENDENCIES//////////////////////////////////////
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//PORT////////////////////////////////////////////////
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGO_URI || 'mongodb://localhost:27017/project2'

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

//CONTROLLERS/////////////////////////////////////////
var unitsController = require('./controllers/unitController');
app.use('/units', unitsController);

//ROOT ROUTE//////////////////////////////////////////
app.get('/', function(req, res){
  res.render('index.ejs');
});

//LISTENER/////////////////////////////////////////////
app.listen(port, function(){
  console.log('UNITS APP RUNNING');
});
