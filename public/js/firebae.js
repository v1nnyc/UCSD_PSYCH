// WARNING! THIS SCRIPT MUST BE INCLUDED IN THE HEADERS AFTER THE GOOGLE FIREBASE
// API SCRIPTS IN THE HEADER TAG!!

var config = {
  apiKey: "AIzaSyCa5_e0vkkiBXQxKcpvGKHyumnWyvQ_os8",
  authDomain: "ucsd-psych.firebaseapp.com",
  databaseURL: "https://ucsd-psych.firebaseio.com",
  projectId: "ucsd-psych",
  storageBucket: "ucsd-psych.appspot.com",
  messagingSenderId: "325328536445"
};

firebase.initializeApp(config);

const database = firebase.database();

//change based on which branch you're on
const experiment = 'slider/';

//signifies that the current page requires firebase,
let firebaseInUse = false;

// used to create a new user
function createNewUser() {
  return new Promise(function(resolve, reject) {
    firebase.auth().signInAnonymously().then(function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user.uid)
        }
      });
    });
  })
}

// helper function to put data into database
// dataSet : {path: path to post to, data: data to post}
function setDatabase(dataSet) {
  return new Promise(function(resolve, reject) {
    database.ref(experiment + dataSet.path).set(dataSet.data).then(e => {
      firebaseCompleted();
    });
  });
}

// setters for firebaseInUse
function requiresFirebase() {
  getUserData();
  pauseRedirect();
}

function firebaseCompleted() {
  resumeRedirect();
}

// called when we know we'll need uid (or exptype) to put something into firebase
function getUserData() {
  return new Promise(function(resolve) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.userId = user.uid;
        firebase.database().ref("slider/" + window.userId + "/experiment type")
          .once('value').then(function(snapshot) {
            window.experimentType = snapshot.val();
            resolve()
          });
      }
    });
  })
}
