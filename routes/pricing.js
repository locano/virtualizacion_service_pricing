var express = require('express');
var router = express.Router();

const pricingController = require('../controllers').pricing_controller;

router.get('/', function(req, res){  
    console.log(req.query);
    pricingController.getPricing(req, res);
})

module.exports = router;