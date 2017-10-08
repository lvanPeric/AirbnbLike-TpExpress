var fs = require('fs');
var _ = require('lodash');
var bcrypt = require('bcrypt');

var express = require('express');
var router = express.Router();
var database = 'chatting.json';


// db json
var users = require('../db.json').users;
var chatting = require('../chatting.json');

// Tous les tchats existants
router.get('/rooms', function (req, res, next) {
	var mapped = _.map(chatting.channels, _.partialRight(_.pick, ['id', 'name']));
	if (mapped.length > 0) {
		res.json(mapped);
	} else {
		res.status(404).json({error:404, message : 'Aucune chambre disponible'});
	}
});

router.post('/rooms/create', function (req, res, next) {
	var room = req.body.name;
	if (!room) {
		res.status(406).json({error : 406, message : 'Mauvais paramètres'});
	} else {
		var roomID = !chatting.channels.length > 0 ? 0 : chatting.channels[chatting.channels.length-1].id + 1;
		// insertion room
		chatting.channels.push({id: roomID, name : room, messages:[]});
		fs.writeFile(database, JSON.stringify(chatting), 'utf8', function () {
			res.json(chatting)
		});
	}
});

//Insertion message

router.post('/messages/create/room/:room_id/user/:user_id', function (req, res, next) {
	var room = req.params.room_id,
		user = req.params.user_id,
		message = req.body.messageText;

	if (!messageText) {
		res.status(406).send({error: 406, message: 'Il manque le message'})
	} else {
		var filter = _.findIndex(chatting.channels, {id: parseInt(room)});
		var filterUser = _.findIndex(users, {id: parseInt(user)});

		var error = '';
		if (filter < 0) error += '(chat room) ';
		if (filterUser < 0) error += '(user) ';
		if(error != ''){
			res.status(404).send({error:404, message: error + 'introuvable'});
		} else {

			var messageID = !chatting.channels[filter].messages.length > 0 ? 0 : chatting.channels[filter].messages[chatting.channels[filter].messages.length - 1].id + 1;

			// insertion message
			chatting.channels[filter].messages.push({
				id: messageID,
				user: users[filterUser].id,
				text: message,
				date: new Date().toISOString()
			});
			fs.writeFile(database, JSON.stringify(chatting), 'utf8', function () {
				res.json(chatting.channels[filter])
			});
		}
	}
});

//Récup tchat
router.get('/rooms/:room_id', function (req, res, next) {
	var room = req.params.room_id;
	var filter = _.findIndex(chatting.channels, {id: parseInt(room)});
	if (filter >= 0) {
		res.json(chatting.channels[filter]);
	} else {
		res.status(404).json({error: 404, message:'room chatting '+room+' not found'})
	}
});

//Supprimer channel
router.delete('/rooms/delete/:room_id', function (req, res, next) {
	var room = req.params.room_id;
	var deletedRoom = _.remove(chatting.channels, {id: parseInt(room)});
	if (deletedRoom.length > 0) {
		fs.writeFile(database, JSON.stringify(chatting), 'utf8', function () {
			res.json({'tchat supprimé': deletedRoom});
		});
	} else {
		res.status(404).json({error:404, message : 'Rien à supprimer'});
	}
});

module.exports = router;
