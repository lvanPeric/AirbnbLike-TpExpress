var express = require('express');
var router = express.Router();
var bookings = require('../models/Booking');

var bookings = require('../controllers/Bookings');

router.post('/create', bookings.create);

router.put('/update', bookings.update);

router.put('/delete', bookings.delete);


module.exports = router;