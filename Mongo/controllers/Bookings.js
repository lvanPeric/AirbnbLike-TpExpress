require('../models/Booking');

var mongoose = require('mongoose'),
    Booking = mongoose.model('Booking');

var Bookings = {
    index: function (req, res) {
        Booking.find({}, function (err, bookings) {
            if (err) throw err;

            // object of all the users
            console.log(bookings);
            res.render('bookings/index', { "bookings": bookings });
        });
    },
    create: function (req, res) {
        //console.log(req.body, req);
        var booking = new Booking({
            bookingDate: req.body.bookingDate,
            totalPrice: req.body.totalPrice,
            user_id: req.body.user_id,
            place_id: req.body.place_id
        });
        booking.save(function (err) {
            if (err) {
                throw err;
            }
            console.log('La réservation a été effectuée!');
            console.log(booking);
        });
        //res.json(u);
        res.redirect('Connexion');
    },


    update: function (req, res) {
        Booking.findById(req.params.id, function (err, booking) {
            if (err) throw err;

            // change the users location
            booking.name = req.body;

            // save the booking
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