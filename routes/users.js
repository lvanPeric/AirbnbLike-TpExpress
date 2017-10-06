var fs = require('fs');
var express = require('express');
var router = express.Router();


var obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));

router.get('/', function(req, res, next) {
    res.status(400).json({"error" : "Bad paramters"});
});
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.body.id;
  if (!id) {
    res.status(400).json({"error" : "Bad paramters"});
  } else {
    var user = obj.users.id;
    if (!user) res.status(404).json({"error" : "User id not found"});
    else res.json({'user' : user});
  }
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    fs.readFile('db.json', 'utf8', function readFileCallback(err, data){
        if (err){
            throw err
        } else {
            obj = JSON.parse(data); //now it an object
            obj.users.push({id: 1, username: username, password: password}); //add some data
            var json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('db.json', json, 'utf8'); // write it back
        }
    });
    res.json('end')
});

router.put('/updates', function (req, res, next) {

  res.send('put');
});

module.exports = router;