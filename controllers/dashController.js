var express = require('express');
var router = express.Router();
var Unit = require('../models/unit.js');

//INDEX ROUTE///////////////////////////////////////////////////////////////////////////
router.get('/', function(req, res){
  Unit.find({}, function(err, foundUnits){
    res.render('dash.ejs', {
      allUnits: foundUnits
    });
  });
});












module.exports = router;
