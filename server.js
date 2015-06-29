// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
// nodemailer feature
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport(ses({
    accessKeyId: 'AKIAJWLUTIAM6JJ5WBPQ',
    secretAccessKey: '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'
}));


// require body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// format dates in javascript
app.use(express.static(path.join(__dirname, './client')));

// require config files
require('./config/mongoose.js');

// routes
  // require users.js controller
  var users = require('./Server/controllers/users.js');

	app.get('/',function(req,res){
	  res.sendfile('index.html');
	});
  	// get all users
	app.get('/users', function(req, res) {
	  users.show(req, res);
	});
	// add a user
	app.post('/users', function(req, res) {
		users.add(req, res);
	});
	// delete a user
	app.post('/users/delete', function(req, res) {
		// console.log(req.body);
		users.remove(req, res);
	});
	// nodemailer feature
	app.get('/send', function(req, res) {
		var mailOptions={
			to : "evanbuss@gmail.com",
			subject : req.query.subject,
			text : req.query.text
		};
		console.log(mailOptions);
		transporter.sendMail(mailOptions, function(error, response){
			if(error){
			console.log(error);
			res.end("error");
			}else{
			console.log("Message sent: " + response.message);
			res.end("sent");
			}
		});
	});

// listen on port 8000
app.listen(8000, function() {
  console.log('Listening on port: 8000');
});