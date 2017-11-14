var bcrypt = require('bcrypt');


require('../models/User');




var mongoose = require('mongoose'),
User = mongoose.model('User');



var Users = {
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;

            // object of all the users
            console.log(users);
            res.render('users/index', {"users" : users});
        });

        
    },
    create: function (req, res) {
        
        var user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            nationality: req.body.gender,
            userAddress: req.body.userAddress,
            userCity: req.body.userCity,
            userPostalCode: req.body.userPostalCode,
            userCountry: req.body.userCountry,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        });
            if (!user.email || !user.password) {
                res.status(406).send({error: 406, message : 'Il manque une information'})
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        user.password = hash;
                        user.save(function (err) {
                            if (!err) {
                                console.log('Utilisateur enregistré');
                                console.log(user);
                                res.send(user);
                            }else{
                                throw err;
                            }
                        });
                    });
                });
            }
        },


    update: function (req, res) {

        var email = req.body.email,
            password = req.body.password;
        
        console.log(req.body);

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;
            console.log(user);
            
            user.email = email;

            User.comparePassword(password, user.password, function(err, isMatch){
                if (err) throw err;
                console.log(isMatch);
                if (isMatch){
                    console.log('ok');
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(user.password, salt, function(err, hash) {
                            user.password = hash;
                            user.save(function (err) {
                                if (!err) {
                                    console.log('Utilisateur modifié');
                                    console.log(user);
                                }else{
                                    throw err;
                                }
                            });
                        });
                        res.send(user);
                    });
                }
            })

        });

        
    },
    delete: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('Utilisateur supprimé!');
            });
        });

    },
    connect : function(req, res){
        
                connect = {
                    email : req.query.email,
                    password : req.query.password
                    };
                console.log('--------Informations rentrées LogIn--------');
                console.log('infos rentrées : ');
                console.log('email : ' + connect.email);
                console.log('password : ' + connect.password);
        
            /*-----VERIFICATION EXISTENCE EMAIL DANS BDD-----*/
        
                User.findOne({ 'email' : req.body.email, 'pwd' : req.body.password}, function(err, userStock){
                    if (!userStock) {
                        console.log('Veuillez vous inscrire');
                        res.render('users/inscription');
                    }
                    
                    else{
                        var password = req.body.pwd;
                        var adminPass = userStock.pwd; 
                        if (password == adminPass) {
                            req.session.email = userStock.email;
                        };
                        res.redirect('Pictures');
                    };
                });
        
            },
        
            disconnect : function(req, res){
                session.destroy();
            }

};

module.exports = Users;