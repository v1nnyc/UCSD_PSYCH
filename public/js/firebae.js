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

function getUserData() {
  return new Promise(function(resolve) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.userId = user.uid;
        firebase.database().ref("popup/" + window.userId + "/experiment type")
          .once('value').then(function(snapshot) {
            window.experimentType = snapshot.val();
            resolve()
          });
      }
    });
  })
}

//signifies that the current page requires firebase, should pause redirection
let firebaseInUse;

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
function setDatabase(dataSet) {
  return new Promise(function(resolve, reject) {
    database.ref('popup/' + dataSet.path).set(dataSet.data).then(e => {
      firebaseCompleted();
    });
  });
}

// setters for firebaseInUse
function requiresFirebase() {
  getUserData();
  firebaseInUse = true;
}

function firebaseCompleted() {
  firebaseInUse = false;
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

function getUserData() {
  return new Promise(function(resolve) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.userId = makeUserID(25);
        //user.uid = window.userId;
        //console.log(window.userId);
        //window.userId = user.uid;
        firebase.database().ref("popup/" + window.userId + "/experiment type")
          .once('value').then(function(snapshot) {
            window.experimentType = snapshot.val();
            resolve()
          });
      }
    });
  })
}

//signifies that the current page requires firebase, should pause redirection
let firebaseInUse;

// used to create a new user
function createNewUser() {
  return new Promise(function(resolve, reject) {
    firebase.auth().signInAnonymously().then(function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //resolve(user.uid)
          //user.uid = makeUserID(20);
          //console.log(user.uid);
          resolve(user.uid);
        }
      });
    });
  })
}

// helper function to put data into database
function setDatabase(dataSet) {
  return new Promise(function(resolve, reject) {
    database.ref('popup/' + dataSet.path).set(dataSet.data).then(e => {
      firebaseCompleted();
    });
  });
}
function makeUserID(length){
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
// setters for firebaseInUse
function requiresFirebase() {
  getUserData();
  firebaseInUse = true;
}

function firebaseCompleted() {
  firebaseInUse = false;
}
