var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var schema = new Schema({
type: {type: String, required: true},
ad: {type: String, required: true},
description: {type: String, required: true},
locationAddress: {type: String, required: true},
locationPostalCode: {type: Number, required: true, unique: true},
locationCity: {type: String, required: true},
locationCountry: {type: String, required: true},
pricePerDay: {type: Number, required: true},
contactEmail: {type: String, required: true, unique: true}
});

var Place = module.exports = mongoose.model('Place', schema, 'places');