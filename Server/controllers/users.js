// Users Controller
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var User = mongoose.model('User');
var object = {};

	object.show = function(req, res) {
	  User.find({}, function(err, results) {
	    if(err) {
	      console.log(err);
	    } else {
	      res.json(results);
	    }
	  });
	};

	object.add = function(req, res) {
		var new_user = new User({ name: req.body.name, created_at: req.body.created_at});
		new_user.save(function(err, response)
		{
			if(err) {
				console.log("there was an error creating a new user");
				// user.index(req, res, user.err);
			}
			else {
				console.log("successfully created a user");
				res.json(response);
			}
		});
	};
	object.remove = function(req, res) {
		console.log(req.body.name, 'was removed from the database');
		User.remove({_id: req.body._id}, function(err, user){
			res.redirect("/");
		});
	};

module.exports = object;


