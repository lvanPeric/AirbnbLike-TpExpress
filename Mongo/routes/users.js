var express = require('express');
var router = express.Router();
var User = require('../models/User');

var users = require('../controllers/Users');

router.get('/inscription', function(req, res){
    res.render('user');
});

router.post('/create', users.create);

router.put('/update/:id', users.update);

router.delete('/delete/:id', users.delete);


module.exports = router;