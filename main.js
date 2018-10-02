// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "AIzaSyCutBMcdNFvN7KzMagyT3ai5lC6w0VRf30",
    authDomain: "form-mestre.firebaseapp.com",
    databaseURL: "https://form-mestre.firebaseio.com",
    projectId: "form-mestre",
    storageBucket: "form-mestre.appspot.com",
    messagingSenderId: "1090246239993"
  };
  firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');

  // Save message
  saveMessage(name, email);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
  });
}