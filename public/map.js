// var config = require('./config');

// $( document ).ready(function() {

function initMap() {
  // draw map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    styles: 
    [{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: true
  });

  // populate map with markers
  var markers = [];
  $.getJSON('https://resplendent-torch-9494.firebaseio.com/users.json', function(data) {
      // track all user LatLongs
      var allLatLongs = {};

      _.each(Object.keys(data), function(user) {
        var userData = data[user];
        // if latLong already exists another user, apply offset
        var newLat = userData.coordinates.lat;
        if (!(userData.coordinates.lat in allLatLongs)) {
          allLatLongs[userData.coordinates.lat] = userData.coordinates.long;
        } else if (allLatLongs[userData.coordinates.lat] == userData.coordinates.long) {
          newLat = userData.coordinates.lat + (Math.random() * (0.001 - 0.0001) + 0.0001);
          allLatLongs[newLat] = userData.coordinates.long
        }
        var latLong = new google.maps.LatLng(
                    newLat,
                    userData.coordinates.long);
        var marker = new google.maps.Marker({
          position: latLong,
          map: map,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
            // This marker is 27 pixels wide by 32 pixels high.
            size: new google.maps.Size(27, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
          }
        }); 

        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">'+ userData.name+'</h1>'+
          '<div id="bodyContent">'+
          '<p><b> </b>will be in ' + userData.location + " " + userData.startDate +  " to " + userData.endDate + ' </p>'+
          '<p> Contact info: ' + userData.contact + 
          '</p>'+
          '</div>'+
          '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        markers.push(marker);
      });
      var markerCluster = new MarkerClusterer(map, markers);
// Read more: http://jaspreetchahal.org/google-markerclusterer-handling-multiple-markers-on-same-geo-location/#ixzz45lXFa22D
    
    });
  

}

// https://developers.google.com/maps/documentation/javascript/examples/marker-simple
