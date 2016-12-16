var express = require('express');
var router = express.Router();
var Unit = require('../models/unit.js');
var Delivery = require('../models/delivery.js');
var Transaction = require('../models/transaction.js');
var Customer = require('../models/customer.js');
var moment = require('moment');

//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Unit.find({}, function(err, foundUnits){
    res.render('units/index.ejs', {
      allUnits: foundUnits,
      moment: moment
    });
  });
});

//ADD RETURN EMPTY DELIVERY ROUTE//////////////////////////////////////
router.post('/deliveryRE', function(req, res){
  console.log('Attempting to add RE from Units Index');
  Delivery.create(req.body, function(err, createdDelivery){
    Unit.findById(createdDelivery.container, function(err, foundUnit){
      foundUnit.deliveryScheduled = true;
      foundUnit.save(function(err, savedUnit){
        res.redirect('/units');
      });
    });
  });
});

//ADD RETURN FULL DELIVERY ROUTE//////////////////////////////////////
router.post('/deliveryRF', function(req, res){
  console.log('Attempting to add RF from Units Index');
  Delivery.create(req.body, function(err, createdDelivery){
    Unit.findById(createdDelivery.container, function(err, foundUnit){
      foundUnit.deliveryScheduled = true;
      foundUnit.empty = false;
      foundUnit.save(function(err, savedUnit){
        res.redirect('/units');
      });
    });
  });
});

//ADD DELIVER FULL ROUTE//////////////////////////////////////
router.post('/deliveryDF', function(req, res){
  console.log('Attempting to add DF from Units Index');
  Delivery.create(req.body, function(err, createdDelivery){
    Unit.findById(createdDelivery.container, function(err, foundUnit){
      foundUnit.deliveryScheduled = true;
      foundUnit.empty = true;
      foundUnit.save(function(err, savedUnit){
        res.redirect('/units');
      });
    });
  });
});

//ADD CURB TO CURB DELIVERY ROUTE///////////////////////////////////
router.post('/deliveryCTC', function(req, res){
  console.log('Attempting to add CTC from Units Index');
  Delivery.create(req.body, function(err, createdDelivery){
    Unit.findById(createdDelivery.container, function(err, foundUnit){
      foundUnit.deliveryScheduled = true;
      foundUnit.save(function(err, savedUnit){
        res.redirect('/units');
      });
    });
  });
});

//SEED ROUTE//////////////////////////////////////////////
router.get('/seed', function(req, res){
  var data = require('../seeds/units.js');
  Unit.create(data, function(err, units){
    if(err){console.log(err)};
    res.redirect('/units');
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

//DELETE ROUTE/////////////////////////////////////////////
router.delete('/:id', function(req, res){
  Unit.findByIdAndRemove(req.params.id, function(err, foundUnit){
    res.redirect('/units');
  })
})

//SHOW ROUTE//////////////////////////////////////////////
router.get('/:id', function(req, res){
  Unit.findById(req.params.id, function(err, foundUnit){
    res.render('units/show.ejs', {
      unit: foundUnit
    });
  });
});


module.exports = router;
