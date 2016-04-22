var express = require('express');
var path    = require('path');
var config = require('./config');
var Firebase = require('firebase');
var bodyParser = require('body-parser');
var session = require('client-sessions');

require('./cronjobs');

var port = process.env.PORT || 3000;
var ref = new Firebase(config.firebaseUrl);

var app = express();

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  cookieName: 'session',
  secret: 'keyboard cat',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(bodyParser());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index.jade', {apiKey: config.googleMapsApiKey});
});

app.get('/signup', function(req, res) {
	res.render('signup.jade', {apiKey: config.googleMapsApiKey, 
							  firebaseUrl: config.firebaseUrl});
});

app.post('/signup', function(req, res) {
  ref.createUser({
    email    : req.body.email,
    password : req.body.password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
      res.render('signup.jade', {apiKey: config.googleMapsApiKey, error: error});
    } else {
      res.redirect('/');
    }
  });
})

app.get('/home', function (req, res) {

	if (!req.session.user) {
		res.redirect('/');
	}

	params = {apiKey: config.googleMapsApiKey, 
			  firebaseUrl: config.firebaseUrl}
	console.log(req.session.user);		  
	if (req.session.user) {
		params.auth = true;
	} else {
		params.auth = false;
	}

	res.render('home.jade', params);
});

app.post('/login', function (req, res) {

	ref.authWithPassword({
	  email    : req.body.email,
	  password : req.body.password
	}, function(error, authData) {
	  if (error) {
	  	console.log('error');
		res.render('index.jade', {apiKey: config.googleMapsApiKey, 
							  	  firebaseUrl: config.firebaseUrl});
	  
	  } else {
	  	req.session.user = authData;
  		res.redirect('/home');
	  }
	});

});

app.get('/reset', function(req, res) {
	res.render('reset.jade', {apiKey: config.googleMapsApiKey, firebaseUrl: config.firebaseUrl});
});

app.post('/reset', function(req, res) {
	ref.resetPassword({
  		email : req.body.email
	}, function(error) {
  		if (error === null) {
    		console.log("Password reset email sent successfully");
  		} else {
    		console.log("Error sending password reset email:", error);
  		}
	});
	res.redirect('/');
});

app.get('/logout', function (req, res) {
	req.session.reset();
	res.redirect('/');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!!!!!');
});

