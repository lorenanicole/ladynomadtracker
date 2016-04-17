var express = require('express');
// var _ = require('underscore');
var app = express();
var path    = require("path");

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index.jade');
	// res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

