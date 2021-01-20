function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})"></td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}
function startTimer() {
  isTimerOn = true;
  startTime = Date.now();
  timer();
}
function timer() {
  var endTime = Date.now();
  var diffTime = endTime - startTime;

  var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  secondsForScore = Math.floor((diffTime /= 1000));

  if (isTimerOn) {
    window.setTimeout(timer, 1000);

    timeDisplay = document.querySelector('.timer').innerHTML =
      hours + ':' + minutes + ':' + seconds;
    newScore = secondsForScore;
  }
}
function stopTimer() {
  isTimerOn = false;
  document.querySelector('.timer').innerHTML = 'your time is: ' + timeDisplay;
}


//--------------------------------------------


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

