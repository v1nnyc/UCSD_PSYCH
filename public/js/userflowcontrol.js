/*
Instructions:
  include script in html headers (*AFTER* THE FIREBAE SCRIPT), then call
  incrementFlow() to move to next page. That's it. super G-eazy.
*/

let flowObject = [{
    'hash': 'eee0e7f39c27094251da528777b601af',
    'page': '/'
  },
  {
    'hash': '27854c76cbca3908f89dec7c892481fc',
    'page': '/instructions'
  },
  {
    'hash': '5d1fa2cf36a76cf9aaf00bfda1b3e11c',
    'page': '/distractor'
  },
  {
    'hash': 'dd9bbc625b65c4f9cd90acae88e973a5',
    'page': '/tetris'
  },
  {
    'hash': '8b1d40589e4bd30c997887c782316eb0',
    'page': '/lineupinstructions'
  },
  {
    'hash': 'e4b8a9b6960a04ed4ec72a9d3c58d08f',
    'page': '/lineup'
  },
  {
    'hash': 'e7ddcf0045e68bbc55be9ab368fdcb74',
    'page': '/stimQuestions'
  },
  {
    'hash': 'bafb037d3c1fbf836e0c695e486dd754',
    'page': '/demographics'
  },
  {
    'hash': '2ed997101d1c0deadb96cdb0bf094b56',
    'page': '/debrief'
  }
];

// name of object put into session storage
let sessionObj = 'sessionObj.1221114'

begin();

function begin() {
  initializeFlow().then(e => {
    checkUserFlow();
    removeFlow();
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
    redirect();
  }
}

// sets new hash in session storage and then redirects to that page
function incrementFlow() {
  console.log(getNextHash())
  setHash(getNextHash());
  redirect();
}

// called on debrief page to remove sessionObj
function removeFlow() {
  if (window.location.pathname == "debrief") {
    window.sessionStorage.removeItem(sessionObj);
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
      return flowObject[i].page
    }
  }
  return null;
}

function getNextHash(currPage) {
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
  window.location = getPathFromHash(getCurrentHash());
}

// used on pages where there is no next button (video, 2048)
function clickNext(){
  document.getElementById("next-button").click();
}

window.onload = function(){
  document.getElementById("next-button").addEventListener("click", incrementFlow);
}
