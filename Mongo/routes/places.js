var express = require('express');
var router = express.Router();
var Place = require('../models/Place');

var places = require('../controllers/Places');

router.get('/ad', function(req, res){
    res.render('place');
});

router.post('/create', places.create);

router.put('/update/:id', places.update);

router.delete('/delete/:id', places.delete);


module.exports = router;