var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var router = express.Router();

router.get('/:name', function(req, res) {
    var db = fs.readFile("db.json", 'utf8',function (err, db) {
    	var database = JSON.parse(db);
		var country = _.filter(database.places, function(x){
		return x.countryCode == req.params.name;
		});
	res.json(country);
	console.log(country);
    });
})

module.exports = router;
