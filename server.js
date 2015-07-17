// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
// require body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// format dates in javascript
app.use(express.static(path.join(__dirname, './client')));

// require config files
require('./config/mongoose.js');
require('./config/routes.js')(app);

// listen on port 8000
app.listen(8000, function() {
  console.log('Listening on port: 8000');
});
