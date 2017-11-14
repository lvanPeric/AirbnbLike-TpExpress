var express = require('express');
var router = express.Router();
var Chat = require('../models/Chat');

var chats = require('../controllers/Chats');

/*router.get('/ad', function(req, res){
    res.render('place');
});*/

router.get('/rooms', chats.rooms);

router.post('/create', chats.create);

router.post('/messages/create', chats.createMessage);

router.delete('/delete/:channels_id', chats.delete);


module.exports = router;