// User Model
var mongoose = require('mongoose');
// create our friendSchema
var UserSchema = new mongoose.Schema({
  name: String,
  created_at: String
});
// use the schema to create the model

mongoose.model('User', UserSchema);

