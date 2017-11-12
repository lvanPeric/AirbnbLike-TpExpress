var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var schema = new Schema({
places_id: {type: String, required: true},
type: {type: String, required: true},
ad: {type: String, required: true},
description: {type: String, required: true},
locationAddress: {type: String, required: true},
locationPostalCode: {type: int, required: true, unique: true},
locationCity: {type: String, required: true},
locationDepartment: {type: String, required: true},
locationCountry: {type: String, required: true},
pricePerDay: {type: int, required: true},
contactEmail: {type: String, required: true, unique: true}
});

exports.model = mongoose.model('Place', schema, 'places');