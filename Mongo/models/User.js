var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;


var schema = new Schema({
firstname: {type: String, required: true},
lastname: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
age: {type: Number},
gender: {type: String},
nationality: {type: String},
userAddress: {type: String},
userCity: {type: String},
userPostalCode: {type: Number},
userCountry: {type: String},
phoneNumber: {type: Number}
});



var User = module.exports = mongoose.model('User', schema, 'users');

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};