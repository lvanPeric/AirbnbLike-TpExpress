var mongoose = require('mongoose');
Schema = mongoose.Schema;

var schema = new Schema({
bookingDate: {type: Date, required: true},
totalPrice: {type: int, required: true},
user_id: {type: int, required: true},
place_id: {type: int, required: true}
});

exports.model = mongoose.model('Booking', schema, 'bookings');