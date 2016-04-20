var firebaseUrl = $('#firebase').attr('url');
var myDataRef = new Firebase(firebaseUrl);
var usersRef = myDataRef.child('users').push();

const signupIds = ['#emailInput', '#passwordInput'];

$('#submit').click(function(e)  {
  e.preventDefault();
 
  var userData = {};

  _.each(signupIds, function(id) {
    var property = id.replace('#','').replace('Input', '');
    userData[property] = $(id).val(); 
    $(id).val('');
  });

  myDataRef.createUser({
    email    : userData.email,
    password : userData.password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      window.location.href = '/';
    }
  });

});