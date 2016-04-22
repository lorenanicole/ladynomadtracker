var CronJob = require('cron').CronJob;
var _ = require('underscore');
var jsdom = require('jsdom');

jsdom.env("", function(err, window) {
		if (err) {
			console.error(err);
			return;
		}
	 
	var $ = require("jquery")(window);

	// send emails for those that want notifications on people in their hood
	var job = new CronJob({
  cronTime: '00 32 17 * * 1-5',
  onTick: function() {
    
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */

     //https://calendee.com/2015/02/04/retrieving-all-firebase-registrations/
     // $.getJSON('https://admin.firebase.com/account?token=-KF64rqIk3H3D8pRG6uF%7C4764498fcf906244b42a509ee372f734', function(data)) {

     // }

	  $.getJSON('https://resplendent-torch-9494.firebaseio.com/users.json', function(data) {
	    // var results = data.results[0];
	    console.log(data);
	 //    _.each(signupIds, function(id) {
		//     var property = id.replace('#','').replace('Input', '');
		//     userData[property] = $(id).val(); 
		//     $(id).val('');
		// });

	  });


  },
  start: true,
  timeZone: 'America/Chicago'
});
job.start();
});
