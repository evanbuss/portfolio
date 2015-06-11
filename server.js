// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
// nodemailer feature
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	 auth: {
	    XOAuth2: {
	      user: "evanbuss@gmail.com",
	      clientId: "856504234895-b4pf25sfjr8n98ufepusv73sf1fd20un.apps.googleusercontent.com",
	      clientSecret: "APZ_EfUN9HAIQxI7i_POY-Fm",
	      refreshToken: "1/YUQ3Ckqw_Spif-MeFW0tpXJsvoxIZ1N2cyBCOp1F3FFIgOrJDtdun6zK6XiATCKT"
	    }
	  }
});
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
  	//gets all users
	app.get('/users', function(req, res) {
	  users.show(req, res);
	});
	// note how we are delegating to the controller and passing along req and res
	app.post('/users', function(req, res) {
		users.add(req, res);
	});
	app.post('/users/delete', function(req, res) {
		// console.log(req.body);
		users.remove(req, res);
	});
	app.get('/send', function(req, res) {
		var mailOptions={
			to : req.query.to,
			subject : req.query.subject,
			text : req.query.text
		};
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
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