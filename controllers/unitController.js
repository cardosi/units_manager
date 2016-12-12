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

//EDIT ROUTE/////////////////////////////////////////////
router.get('/:id/edit', function(req, res){
  Unit.findById(req.params.id, function(err, foundUnit){
    res.render('units/edit.ejs', {
      unit: foundUnit
    });
  });
});

//UPDATE ROUTE////////////////////////////////////////////
router.put('/:id', function(req, res){
  console.log('update route accessed');
  Unit.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUnit){
    res.redirect('/units/'+req.params.id);
  });
});

//SHOW ROUTE//////////////////////////////////////////////
router.get('/:id', function(req, res){
  Unit.findById(req.params.id, function(err, foundUnit){
    res.render('units/show.ejs', {
      unit: foundUnit
    });
  });
});


module.exports = router;
