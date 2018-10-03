'use strict';


function responsive() {
	// Responsive 
	$('.responsive').on('click', function(event) {
		$('.menu-list').slideToggle(400);
		event.preventDefault();
	});
}

(function($) {
	// Call all functions
	responsive();

})(jQuery);

// Capture ip
function getIp(callback) {
  function response(s) {
    callback(window.userip);

    s.onload = s.onerror = null;
    document.body.removeChild(s);
  }

  function trigger() {
    window.userip = false;

    var s = document.createElement("script");
    s.async = true;
    s.onload = function() {
      response(s);
    };
    s.onerror = function() {
      response(s);
    };

    s.src = "https://l2.io/ip.js?var=userip";
    document.body.appendChild(s);
  }

  if (/^(interactive|complete)$/i.test(document.readyState)) {
    trigger();
  } else {
    document.addEventListener("DOMContentLoaded", trigger);
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCutBMcdNFvN7KzMagyT3ai5lC6w0VRf30",
  authDomain: "form-mestre.firebaseapp.com",
  databaseURL: "https://form-mestre.firebaseio.com",
  projectId: "form-mestre",
  storageBucket: "form-mestre.appspot.com",
  messagingSenderId: "1090246239993"
};
firebase.initializeApp(config);

getIp(function(ip) {
  var ip = ip;
  // Reference messages collection
  var messagesRef = firebase.database().ref("messages");

  // Listen for form submit
  document.getElementById("contactForm").addEventListener("submit", submitForm);

  // Submit form
  function submitForm(e) {
    e.preventDefault();

    new Date($.now());
    var dt = new Date();
    var mes = dt.getMonth() + 1;
    var time =
      dt.getFullYear() +
      "-" +
      mes +
      "-" +
      dt.getDate() +
      " " +
      dt.getHours() +
      ":" +
      dt.getMinutes() +
      ":" +
      dt.getSeconds();

    // Get values
    var name = getInputVal("name");
    var email = getInputVal("email");

    // Save message
    saveMessage(email, name, ip, time);

    // Show alert
    document.querySelector(".alert").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Clear form
    document.getElementById("contactForm").reset();
  }

  // Function to get get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }

  // Save message to firebase
  function saveMessage(email, name, ip, time) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      email: email,
      name: name,
      ip: ip,
      tipo:"B2C",
      time:time
    });
  }
});
