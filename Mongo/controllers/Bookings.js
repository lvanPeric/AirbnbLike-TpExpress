require('../models/Booking');

var mongoose = require('mongoose'),
    Booking = mongoose.model('Booking');

var Bookings = {
    index: function (req, res) {
        Booking.find({}, function (err, bookings) {
            if (err) throw err;

            console.log(bookings);
            res.render('bookings/index', { "bookings": bookings });
        });
    },
    create: function (req, res) {
        var booking = new Booking({
            bookingDate: req.body.bookingDate,
            bookingDateEnd: req.body.bookingDateEnd,
            totalPrice: req.body.totalPrice
            
        });
        if (!booking.bookingDate) {
            res.status(406).send({ error: 406, message: 'Il manque une information' })
        } else {
            booking.save(function (err) {
                if (err) {
                    throw err;
                } else { 
                    res.send(booking);
                    
                } 

                });
        }
    },


    update: function (req, res) {
        Booking.findById(req.params.id, function (err, booking) {
            if (err) throw err;

            booking.save(function (err) {
                if (err) throw err;
                console.log('La réservation a été modifiée');
            });
        });
        res.render('bookings/update');
    },
    delete: function (req, res) {
        Booking.findById(req.params.id, function (err, booking) {
            if (err) throw err;
            // delete him
            booking.remove(function (err) {
                if (err) throw err;
                console.log('La réservation a été annulée');
            });
        });
        res.render('bookings/delete');
    },
};

module.exports = Bookings;