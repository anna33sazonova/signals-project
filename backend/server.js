var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello World');
})
var server = app.listen(4200, function() {
  console.log("Backend Application listening at http://localhost:4200")
})