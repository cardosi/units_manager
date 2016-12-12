var express = require('express');
var router = express.Router();
var Unit = require('../models/unit.js');

//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Unit.find({}, function(err, foundUnits){
    console.log(foundUnits);
    res.render('units/index.ejs', {
      allUnits: foundUnits
    });
  });
});

//NEW ROUTE//////////////////////////////////////////////
router.get('/new', function(req, res){
  Unit.find({}, function(err, allUnits){
    res.render('units/new.ejs', {
      units: allUnits
    });
  });
});

//CREATE ROUTE///////////////////////////////////////////
router.post('/', function(req, res){
  Unit.create(req.body, function(err, createdUnit){
    res.redirect('/units');
    console.log(req.body);
  });
});













module.exports = router;
