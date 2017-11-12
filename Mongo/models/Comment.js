var mongoose = require('mongoose');
Schema = mongoose.Schema;

var schema = new Schema({
text: {type: String, required: true},
notation: {type: int, required: true},
user_id: {type: int, required: true}
});

exports.model = mongoose.model('Comment', schema, 'comments');