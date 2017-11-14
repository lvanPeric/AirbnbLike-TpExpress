var _ = require('lodash');

require('../models/Chat');

var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var Chats = {
    index: function (req, res) {
        Chat.find({}, function (err, chats) {
            if (err) throw err;

            // object of all the chats
            console.log(chats);
            res.render('chats/index', { "chats": chats });
        });
    },

    rooms: function (req, res, next) {
        var mapped = _.map(channels, _.partialRight(_.pick, ['channels_id', 'subject']));
        if (mapped.length > 0) {
            res.json(mapped);
        } else {
            res.status(404).send({ error: 404, message: 'Aucune chambre disponible' });
        }
    },

    create: function (req, res) {
        var chat = new Chat({
            channels: req.body.channels,
            channel_id: req.body.channel_id,
            subject: req.body.subject,
            message: req.body.message,
            message_id: req.body.message_id,
            user_id: req.body.user_id,
            message_text: req.body.message_text,
            message_date: req.body.message_date
        });
        if (!chat.subject) {
            res.status(406).send({ error: 406, message: 'Sujet non renseigné' })
        } else {
            var roomID = !channels.length > 0 ? 0 : channels[channels.length - 1].id + 1;
            chat.save(function (err) {
                if (!err) {
                    console.log('Utilisateur enregistré');
                    console.log(chat);
                    res.send(chat);
                } else {
                    throw err;
                }
            });
        }
    },

    createMessage: function (req, res, next) {
        var chat = new Chat({
            channels: req.body.channels,
            channel_id: req.body.channel_id,
            subject: req.body.subject,
            message: req.body.message,
            message_id: req.body.message_id,
            user_id: req.body.user_id,
            message_text: req.body.message_text,
            message_date: req.body.message_date
        });
        if (!messageText) {
            res.status(406).send({error: 406, message: 'Il manque le message'})
        } else {
            var filter = _.findIndex(channels, {channel_id: parseInt(room)});
            var filterUser = _.findIndex(users, {id: parseInt(user)});
    
            var error = '';
            if (filter < 0) error += '(chat room) ';
            if (filterUser < 0) error += '(user) ';
            if(error != ''){
                res.status(404).send({error:404, message: error + 'introuvable'});
            } else {
                var messageID = !channels[filter].message.length > 0 ? 0 : channels[filter].message[channels[filter].message.length - 1].id + 1;
                // insertion message
                channels[filter].message.push({
                    id: messageID,
                    user: users[filterUser].id,
                    text: message,
                    date: new Date().toISOString()
                });
            }
        }
    },

    delete: function (req, res) {
        Chat.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            chat.remove(function (err) {
                if (err) throw err;
                console.log('Chat supprimé!');
            });
        });

    }

};

module.exports = Chats;