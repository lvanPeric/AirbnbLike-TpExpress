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
            res.status(404).send({error:404, message : 'Aucune chambre disponible'});
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
        if (!subject) {
            res.status(406).send({ error: 406, message: 'Sujet non renseigné' })
        } else {
            var roomID = !channels.length > 0 ? 0 : channels[channels.length - 1].channel_id + 1;
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

module.exports = Users;