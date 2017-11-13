var mongoose = require('mongoose');
Schema = mongoose.Schema;

var schema = new Schema({
bookingDate: {type: Date, required: true},
totalPrice: {type: Number, required: true},
user_id: {type: Number, required: true},
place_id: {type: Number, required: true}
});

exports.model = mongoose.model('Booking', schema, 'bookings');