var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(406).json({"error": "Mauvais paramètres"});
});

router.post('/create', function(req, res) {
    var idUser = req.body.idUser;
    var email = req.body.email;
    var phoneNum = req.body.phoneNum;
    var idHouse = req.body.idHouse;
    var date = req.body.date;
    if (!idUser || !email || !phoneNum || !idHouse || !date) {
        res.status(406).send({'error':'Il manque des paramètres'})
    } else {
        fs.readFile('db.json', 'utf8', function (err, db){
            if (err){
                throw err
            } else {
                var json = JSON.parse(db);
                var id = !json.booking.length > 0 ? 0 : json.booking[json.booking.length-1].id + 1;
                json.booking.push({id: id, idUser: idUser, email: email, phoneNum: phoneNum, idHouse: idHouse, date: date});
                var json = JSON.stringify(json);
                fs.writeFile('db.json', json, 'utf8', function () {
                    res.send({'succès' : idUser + " " + email + " " + phoneNum + " " + idHouse + " pour le " + date})
                });
            }
        });
    }
});

router.put('/update/:id', function (req, res) {
    var idUser = req.body.idUser;
    var email = req.body.email;
    var phoneNum = req.body.phoneNum;
    var idHouse = req.body.idHouse
    var date = req.body.date;
    if (!idUser || !email || !phoneNum || !idHouse || !date) {
        res.status(406).send({'error':'Il manque des paramètres'})
    } else {
        fs.readFile('db.json', 'utf8', function (err, json) {
            if (err) {
                throw err
            } else {
                var json = JSON.parse(json);
                var search = _.findIndex(json.booking, {id: parseInt(req.params.id)});
                if (search >= 0) {
                    json.booking[search] = {id: parseInt(req.params.id), idUser: idUser, email: email, phoneNum: phoneNum, idHouse: idHouse, date: date};
                    fs.writeFile('db.json', JSON.stringify(json), 'utf8', function () {
                        res.send({'success': "La réservation " + req.params.id + " a été mis à jour : " + idUser + " " + email + " " + idHouse + " " + phoneNum + " au " + date});
                    });
                } else {
                    res.status(404).send({'error': "Réservation " + req.params.id + " introuvable"});
                }
            }
        });
    }
});

router.delete('/delete/:id', function (req, res){
    var id = req.body.id;
    var idUser = req.body.idUser;
    var email = req.body.email;
    var phoneNum = req.body.phoneNum;
    var idHouse = req.body.idHouse;
    var date = req.body.date;
    var db = fs.readFile('db.json', 'utf8', function(err, json){
        if (err) {
            throw err
        } else {
            var json = JSON.parse(json);
            var search = _.remove(json.booking, {id: parseInt(req.params.id)});
            if (search.length > 0) {
                json.booking[search] = {id: parseInt(req.params.id), id: id, idUser: idUser, email: email, phoneNum: phoneNum, idHouse: idHouse, date: date};
                fs.writeFile('db.json', JSON.stringify(json), 'utf8', function () {
                    res.json({'success' : "Réservation supprimé"});
                });
            } else {
                res.status(404).json({'error': "Réservation " + req.params.id + " introuvable"});
            }
        }
    });
});

module.exports = router;

