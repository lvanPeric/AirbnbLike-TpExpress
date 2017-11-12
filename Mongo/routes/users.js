var express = require('express');
var router = express.Router();
var users = require('../models/User');

var users = require('../controllers/Users');

router.post('/create', users.create);

router.put('/update', users.update);

router.put('/delete', users.delete);


module.exports = router;