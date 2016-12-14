var express = require('express');
var moment = require('moment');
var router = express.Router();
var Delivery = require('../models/delivery.js');


//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Delivery.find({}, function(err, foundDeliveries){
    console.log(foundDeliveries);
    res.render('deliveries/index.ejs', {
      allDeliveries: foundDeliveries,
      moment: moment
    });
  });
});

//NEW ROUTE//////////////////////////////////////////////
router.get('/new', function(req, res){
  Delivery.find({}, function(err, allDeliveries){
    res.render('deliveries/new.ejs', {
      deliveries: allDeliveries
    });
  });
});

//CREATE ROUTE///////////////////////////////////////////
router.post('/', function(req, res){
  Delivery.create(req.body, function(err, createdDelivery){
    res.redirect('/deliveries');
    console.log(req.body);
  });
});

//EDIT ROUTE/////////////////////////////////////////////
router.get('/:id/edit', function(req, res){
  Delivery.findById(req.params.id, function(err, foundDelivery){
    res.render('deliveries/edit.ejs', {
      delivery: foundDelivery
    });
  });
});

//UPDATE ROUTE////////////////////////////////////////////
router.put('/:id', function(req, res){
  console.log('update route accessed');
  Delivery.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDelivery){
    res.redirect('/deliveries/'+req.params.id);
  });
});

//DELETE ROUTE/////////////////////////////////////////////
router.delete('/:id', function(req, res){
  Delivery.findByIdAndRemove(req.params.id, function(err, foundDelivery){
    res.redirect('/deliveries');
  })
})

//SHOW ROUTE//////////////////////////////////////////////
router.get('/:id', function(req, res){
  Delivery.findById(req.params.id, function(err, foundDelivery){
    res.render('deliveries/show.ejs', {
      delivery: foundDelivery
    });
  });
});

module.exports = router;
