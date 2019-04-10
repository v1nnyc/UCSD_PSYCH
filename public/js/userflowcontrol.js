/*
Instructions:
  include script in html headers (*BEFORE* THE FIREBAE SCRIPT).
  MUST have a button of id "next-button" in HTML.
  If button is hidden, call "clickNext()"
*/

// while true, all page redirection in userflow is paused
let redirectPaused = false;

let debug = false;

let flowObject = [{
    'hash': 'eee0e7f39c27094251da528777b601af',
    'path': '/'
  },
  {
    'hash': '27854c76cbca3908f89dec7c892481fc',
    'path': '/instructions'
  },
  {
    'hash': '5d1fa2cf36a76cf9aaf00bfda1b3e11c',
    'path': '/distractor'
  },
  {
    'hash': 'dd9bbc625b65c4f9cd90acae88e973a5',
    'path': '/tetris'
  },
  {
    'hash': '8b1d40589e4bd30c997887c782316eb0',
    'path': '/lineupinstructions'
  },
  {
    'hash': 'e4b8a9b6960a04ed4ec72a9d3c58d08f',
    'path': '/lineup'
  },
  {
    'hash': 'e7ddcf0045e68bbc55be9ab368fdcb74',
    'path': '/stimQuestions'
  },
  {
    'hash': 'bafb037d3c1fbf836e0c695e486dd754',
    'path': '/demographics'
  },
  {
    'hash': '2ed997101d1c0deadb96cdb0bf094b56',
    'path': '/debrief'
  }
];

// name of object put into session storage
let sessionObj = 'sessionObj.1221114'

begin();

function begin() {
  initializeFlow().then(e => {
    checkUserFlow();
  });
}

// only important for beginning of experiment. will begin flow object
function initializeFlow() {
  return new Promise(function(resolve, reject) {
    if (!window.sessionStorage.getItem(sessionObj)) {
      setHash(flowObject[0].hash);
    }
    resolve();
  });
}

// called at the beginning of each page to make sure the user is on the correct page
function checkUserFlow() {
  if (window.location.pathname != getPathFromHash(getCurrentHash())) {
    if (!debug) {
      redirect();
    }
  }
}

// sets new hash in session storage and then redirects to that page
function incrementFlow() {
  if (!debug) {
    setHash(getNextHash());
    redirect();
  }

}


// 🤪 helper functions go below this
function getCurrentHash() {
  return window.sessionStorage.getItem(sessionObj)
}

// put in hash, get page path from flow object
function getPathFromHash(hash) {
  for (var i in flowObject) {
    if (flowObject[i].hash == hash) {
      return flowObject[i].path
    }
  }
  return null;
}

function getNextHash(currpath) {
  let currHash = getCurrentHash();
  for (var i in flowObject) {
    if (flowObject[i].hash == currHash) {
      return flowObject[++i].hash
    }
  }
}

function setHash(hash) {
  window.sessionStorage.setItem(sessionObj, hash);
}

function redirect() {
  if (redirectPaused) {
    window.setTimeout(redirect, 100);
  } else {
    window.location = getPathFromHash(getCurrentHash());
  }
}

//helper functions for pausing and unpausing redirect
function pauseRedirect() {
  redirectPaused = true;
}

function resumeRedirect() {
  redirectPaused = false
}

//my markup in my code LOL oh powell.
window.onload = function() {
  document.getElementById("next-button").addEventListener("click", incrementFlow);
}

// used on pages where there is no next button (video, 2048)
function clickNext() {
  document.getElementById("next-button").click();
}
