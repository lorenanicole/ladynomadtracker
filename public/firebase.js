var myDataRef = new Firebase('https://resplendent-torch-9494.firebaseio.com/');
var usersRef = myDataRef.child("users").push();

const messageIds = ['#nameInput', '#locationInput', '#contactInput', '#startDateInput', '#endDateInput'];

$('#endDateInput').keypress(function (e) {

  if (e.keyCode == 13) {
    var personData = {};

    _.each(messageIds, function(id) {
      var property = id.replace('#','').replace('Input', '');
      personData[property] = $(id).val(); 
      $(id).val('');
    });

    var getLatLongRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ encodeURIComponent(personData.location) + '&key=AIzaSyA4AQA_ZJpqGeHF5S2d4T1wii7mgeJD2QI';

    $.getJSON(getLatLongRequest, function(data) {
      var results = data.results[0];
      if (results.geometry === undefined) {
        personData['coordinates'] = {lat: -25.363, lng: 131.044}; // Default
      } else {  
        personData['coordinates'] = {lat: results.geometry.location.lat, 
                                     long: results.geometry.location.lng}
      }
  
      usersRef.set(personData);

    });
    
  }
});
