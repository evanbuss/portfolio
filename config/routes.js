  // This is our routes.js file located in /config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {

  // require users.js controller
  var users = require('./../Server/controllers/users.js');

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

  };