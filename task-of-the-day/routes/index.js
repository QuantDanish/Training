var express = require('express');
var router = express.Router();
var users = require('./users');
var login = require('./login');
//var app  = express();
router.use('/users', users);
router.use('/login', login);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;


