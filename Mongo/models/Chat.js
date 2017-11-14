var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var schema = new Schema({
    channels : [{
        channel_id : Number,
        subject : String,
        message : [{
            message_id : Number,
            user_id : {type : Schema.Types.ObjectId, ref : 'User'},
            message_text : String,
            message_date : Date
        }]
    }]
});

var Chat = module.exports = mongoose.model('Chat', schema, 'chats');