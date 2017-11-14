require('../models/Place');

var mongoose = require('mongoose'),
    Place = mongoose.model('Place');

var Places = {
    index: function (req, res) {
        Place.find({}, function (err, places) {
            if (err) throw err;

        
            console.log(places);
            res.render('places/index', { "places": places });
        });
    },

    create: function (req, res) {
        var place = new Place({
            type: req.body.type,
            ad: req.body.ad,
            description: req.body.description,
            locationAddress: req.body.locationAddress,
            locationPostalCode: req.body.locationPostalCode,
            locationCity: req.body.locationCity,
            locationCountry: req.body.locationCountry,
            pricePerDay: req.body.pricePerDay,
            contactEmail: req.body.contactEmail
        });
        if (!place.type || !place.ad || !place.description || !place.locationAddress || !place.locationPostalCode || !place.locationCity || !place.locationCountry || !place.pricePerDay || !place.contactEmail) {
            res.status(406).send({ error: 406, message: 'Il manque une information' })
        } else {
            place.save(function (err) {
                if (!err) {
                    console.log('Annonce enregistrée');
                    console.log(place);
                    res.send(place);
                } else {
                    throw err;
                }
            });
        }
    },

    update: function (req, res) {
        var type = req.body.type,
            ad = req.body.ad,
            description = req.body.description,
            locationAddress = req.body.locationAddress,
            locationPostalCode = req.body.locationPostalCode,
            locationCity = req.body.locationCity,
            locationCountry = req.body.locationCountry,
            pricePerDay = req.body.pricePerDay,
            contactEmail = req.body.contactEmail;

        Place.findById(req.params.id, function (err, place) {
            if (err) throw err;
            console.log(place);

            place.type = type;
            place.ad = ad;
            place.description = description;
            place.locationAddress = locationAddress;
            place.locationPostalCode = locationCity;
            place.locationCountry = locationCountry;
            place.pricePerDay = pricePerDay;
            place.contactEmail = contactEmail;

            place.save(function (err) {
                if (!err) {
                    console.log('Annonce modifiée');
                    console.log(place);
                    res.send(place);
                } else {
                    throw err;
                }
            });
        });
    },

    delete: function (req, res) {
        Place.findById(req.params.id, function (err, place) {
            if (err) throw err;

            // delete him
            place.remove(function (err) {
                if (err) throw err;

                res.send('Annonce supprimée!');
            });
        });
    }
};

module.exports = Places;