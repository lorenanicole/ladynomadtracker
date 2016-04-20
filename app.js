var express = require('express');
// var _ = require('underscore');
var app = express();
var path    = require('path');
var config = require('./config');
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	console.log(config);
	res.render('index.jade', {apiKey: config.googleMapsApiKey, 
							  firebaseUrl: config.firebaseUrl});
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!!!!!');
});

