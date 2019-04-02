let flow = {
  0: 'index',
  1: 'instructions',
  2: 'distractor',
  3: 'tetris',
  4: 'lineupinstructions',
  5: 'lineup',
  6: 'stimQuestions',
  7: 'demographics',
  8: 'debrief'
};

console.log("hey")

let firebaseCopy;

function checkUserFlow(firebase) {
  firebaseCopy = firebase;
  firebaseCopy.auth().onAuthStateChanged(function(user) {
    if (user) {
      redirect(user.uid);
    }
  });
}

function incrementFlow(uid) {
  firebaseCopy.database().ref('slider/' + uid + '/flow').update({
    "flow": getNextPage(window.location.pathname)
  }).then((response) => {
    redirect(uid);
  });
}

function getNextPage(currPage) {
  for (var i in flow) {
    if(flow[i] === currPage){
      return i++;
    }
  }
}

function redirect(uid) {
  firebaseCopy.database().ref("slider/" + uid + "/flow")
    .once('value').then(function(snapshot) {
      let currPageIndex = snapshot.val();
      if(window.location.pathname != flow[currPageIndex]){
        window.location = flow[++currPageIndex]
      }
    });
}
