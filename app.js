var express = require('express');
// var _ = require('underscore');
var app = express();
var path    = require('path');
var config = require('./config');
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');


app.get('/signup', function(req, res) {
	res.render('signup.jade', {apiKey: config.googleMapsApiKey, 
							  firebaseUrl: config.firebaseUrl});
});

app.get('/', function (req, res) {
	res.render('index.jade', {apiKey: config.googleMapsApiKey, 
							  firebaseUrl: config.firebaseUrl});
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!!!!!');
});

