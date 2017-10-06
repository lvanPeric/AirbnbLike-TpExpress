var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
 
router.get('/', function(req, res, next) {
  res.send('contact');
});
 
// Send Email
router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ivan.peric93100@gmail.com',
        pass: 'I12042016.'
      }
    });
 
    var mailOptions = {
      from: '"Ivan PERIC" <ivan.peric93100@gmail.com>',
      to: 'ilithpriscith@gmail.com',
      subject: 'Hello from PCRepair',
      text: 'You have a submission from... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
      html: `
      You have a submission from...
      <ul><li>Name: ${req.body.name} </li>
      <li> Email: ${req.body.email} </li>
      <li> Message: ${req.body.message} </li>
      </ul>`
    }
 
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message Sent: '+ info.response);
      res.send('Mail send');
    });
});
 
module.exports = router;