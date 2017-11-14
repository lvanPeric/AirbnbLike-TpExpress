var mongoose = require('mongoose');
Schema = mongoose.Schema;

var schema = new Schema({
bookingDate: {type: Date, required: true},
bookingDateEnd : {type: Date, require: true},
totalPrice: {type: Number, required: true}
});

var Booking = module.exports = mongoose.model('Booking', schema, 'booking');