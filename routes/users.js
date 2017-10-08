var fs = require('fs');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var mailsend = require('../module/email');

var database = 'db.json';
var db = require('../db.json');

router.get('/', function(req, res, next) {
    res.status(406).send({error: 406, message : 'Mauvais identifiant'});
});

// On demande le mdp
router.get('/id/:id', function(req, res, next) {
	var IDuser = req.params.id;
	if (!IDuser) {
		res.status(406).send({error: 406, message : 'Mauvais identifiant'});
	} else {
		var filter = _.findIndex(db.users, {id: parseInt(IDuser)});
		if (filter >= 0) {
			res.json(db.users[filter])
		} else {
			res.status(404).send({error: 404, message : 'Utilisateur ' + IDuser + ' est introuvable'});
		}
	}
});

router.post('/create', function(req, res, next) {
    var username = req.body.username,
    	password = req.body.password,
		email = req.body.email;
    if (!username || !password || !email) {
        res.status(406).send({error: 406, message : 'Il manque une information'})
    } else {
		//Cryptage du mot de passe
		var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		//Ecriture du json
		var IDuser = !db.users.length > 0 ? 0 : db.users[db.users.length-1].id + 1;
		var newUser = {id: IDuser, username: username, email: email, password: hash};
		db.users.push(newUser);
		fs.writeFile(database, JSON.stringify(db), 'utf8', function () {
			mailsend(email, 'Compte créé', 'Bienvenue', '<h1>Bienvenue</h1><p>'+ username +', votre compte à été créé. </p><br><b>ID : '+IDuser+'</b>');
			res.json({added : newUser})
		});
    }
});

router.patch('/update/:id', function (req, res, next) {
    var username = req.body.username,
    	password = req.body.password,
		email = req.body.email,
    	IDuser = req.params.id;
	if (!username || !password) {
		res.status(406).send({error:406,message:'Mauvais identifiant'})
	} else {
		var passwordhash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		var filter = _.findIndex(db.users, {id: parseInt(IDuser)});
		if (filter >= 0) {
			db.users[filter] = {id: parseInt(IDuser), username: username, email: email, password: passwordhash};
			fs.writeFile(database, JSON.stringify(db), 'utf8', function () {
				res.json({updated : db.users[filter]});
			});
		} else {
			res.status(404).send({error: 404,message:'Utilisateur ' + IDuser + ' est introuvable'});
		}
	}
});

module.exports = router;
