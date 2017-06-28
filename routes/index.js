var express = require('express');
var router = express.Router();
 
var pricing_route = require('./pricing');
router.use('/pricing', pricing_route);
 
//API start
router.get('/', function(req, res) {
  res.status(200).send({
    message: 'Bienvenido al API de su Microservicio',
  });
});
 
module.exports = router;