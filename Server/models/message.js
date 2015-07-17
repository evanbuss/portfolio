// Message Model
var mongoose = require('mongoose');
// create our friendSchema
var MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  created_at: String
});
// use the schema to create the model

// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('email').required(true, 'User email cannot be blank');
mongoose.model('Message', MessageSchema);

