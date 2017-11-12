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
        
        //console.log(req.body, req);
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

        user.save(function (err) {
            if (err) {
                
                throw err;
            }
            console.log('L\'user a été crée!');
            console.log(user);
        });

        //res.json(u);
        res.redirect('Connexion');
    },


    update: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // change the users location
            user.name = req.body;

            // save the user
            user.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
            });

        });

        res.render('users/update');
    },
    delete: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('User successfully deleted!');
            });
        });

        res.render('users/delete');
    },
    


    connect : function(req, res){

    /*------VALEURS RENTREES-----*/

        connect_json = {
            email : req.body.email,
            pwd : req.body.pwd
            };
        console.log('--------Informations rentrées LogIn--------');
        console.log('infos rentrées : ');
        console.log('email : ' + connect_json.email);
        console.log('password : ' + connect_json.pwd);

    /*-----VERIFICATION EXISTENCE EMAIL DANS BDD-----*/

        User.findOne({ 'email' : req.body.email, 'pwd' : req.body.pwd}, function(err, userStock){
            if (!userStock) {
                console.log('Can\'t find admin user. Please create one');
                res.render('users/Inscription');
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