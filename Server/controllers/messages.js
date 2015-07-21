// Messages Controller
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var object = {};

	object.show = function(req, res) {
	  Message.find({}, function(err, results) {
	    if(err) {
	      console.log(err);
	    } else {
	      res.json(results);
	    }
	  });
	};

	object.add = function(req, res) {
		// console.log('server controller', req.body);
		var new_message = new Message({ name: req.body.name,
										email:req.body.email,
										subject: req.body.subject,
										message: req.body.message ,
										created_at: req.body.created_at
									});
		new_message.save(function(err, response)
		{
			if(err) {
				console.log("there was an error creating a new message");
				// user.index(req, res, user.err);
			}
			else {
				console.log("successfully created a message");
				res.json(response);
			}
		});
	};

module.exports = object;


