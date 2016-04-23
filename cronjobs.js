var CronJob = require('cron').CronJob;
var _ = require('underscore');
var jsdom = require('jsdom');
var nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(
	"smtps://shenomadstracker%40gmail.com:AtRApP582ZWWL0C0g6ab@smtp.gmail.com"
);


jsdom.env("", function(err, window) {
	if (err) {
		console.error(err);
		return;
	}
	 
	var $ = require("jquery")(window);

	// send emails for those that want notifications on people in their hood
	var job = new CronJob({
  	cronTime: '00 50 18 * * 1-5',
  	onTick: function() {
    console.log("haiii");
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
    var users = [];
     //https://calendee.com/2015/02/04/retrieving-all-firebase-registrations/
    $.getJSON('https://auth.firebase.com/v2/resplendent-torch-9494/users?token=-KF64rqIk3H3D8pRG6uF%7C4764498fcf906244b42a509ee372f734', function(userData) {
	    _.each(userData, function(id) {
		    console.log(id);
		});
    });

	$.getJSON('https://resplendent-torch-9494.firebaseio.com/users.json', function(data) {
	    // var results = data.results[0];
	    var item = 0;
	    _.each(data, function(id) {
	    	item ++;
		    console.log(item);
		});

	});
  	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"No Reply" <shenodamdstracker@gmail.com>', // sender address
	    to: 'me@lorenamesa.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world 🐴', // plaintext body
	    html: '<b>Hello world 🐴</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});

  },
  start: true,
  timeZone: 'America/Chicago'
});
job.start();
});
