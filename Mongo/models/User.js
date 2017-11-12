var mongoose = require('mongoose'),
Schema = mongoose.Schema;


var schema = new Schema({
firstname: {type: String, required: true},
lastname: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
age: {type: Number, required : true},
gender: {type: String, required : true},
nationality: {type: String, required : true},
userAddress: {type: String, required : true},
userCity: {type: String, required : true},
userPostalCode: {type: Number, required : true, unique: true},
userCountry: {type: String, required : true},
phoneNumber: {type: Number, required : true}
});

exports.model = mongoose.model('User', schema, 'users');