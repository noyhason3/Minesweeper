window.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault();
  },
  false
);

const MINE = '💥';
const FLAG = '🚩';


var gLevel = { SIZE: 4, MINES: 2 };
var gNonMineCellsCount = gLevel.SIZE ** 2 - gLevel.MINES;
var gBoard;

var gGame = {
  isOn: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function init() {
  // gGame.isOn = true;

  gBoard = buildBoard(gLevel.SIZE);
  setMinesNegsCount(gBoard);
  renderBoard(gBoard, '.board-container');
  
  gGame.secsPassed = startTimer();
  document.querySelector('.timer'), (innerText = gGame.secsPassed);
}

function chooseLevel(level) {
  switch (level) {
    case 'easy':
      gLevel = { SIZE: 4, MINES: 2 };
      break;
    case 'medium':
      gLevel = { SIZE: 8, MINES: 12 };
      break;
    case 'hard':
      gLevel = { SIZE: 12, MINES: 30 };
      break;
  }
  init()
}

function buildBoard(size) {
  var board = [];
  var counter = gLevel.MINES;

  for (var i = 0; i < size; i++) {
    board[i] = [];

    for (var j = 0; j < size; j++) {
      var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };

      board[i][j] = cell;

      if (counter && Math.random() > 0.7) {
        board[i][j].isMine = true;
        counter--;
      }
    }
  }
  console.log(board);
  return board;
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      if (cell.isMine) continue;
      cell.minesAroundCount = countMinesNegsCount({ i: i, j: j });
    }
  }
  return board;
}

function countMinesNegsCount(pos) {
  var counter = 0;
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j > gBoard.length - 1) continue;
      if (i === pos.i && j === pos.j) continue;
      if (gBoard[i][j].isMine) counter++;
    }
  }
  return counter;
}

function renderNegsCells(pos) {
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j > gBoard.length - 1) continue;
      if (i === pos.i && j === pos.j) continue;
      var cell = gBoard[i][j];
      if (cell.isShown || cell.isMarked) continue;
      cell.isShown = true;
      gGame.shownCount++;
      var elCell = document.querySelector(`.cell-${i}-${j}`);
      elCell.innerHTML = cell.minesAroundCount ? cell.minesAroundCount : '';
      elCell.classList.add('shown');
    }
  }
}

function cellClicked(elCell, i, j) {

  var cell = gBoard[i][j];
  if (cell.isMarked)return
  if (cell.isShown) return;
  
  renderCell(elCell, { i: i, j: j });
  if (cell.isMine) return gameOver('Game-Over!');

  cell.isShown = true;
  gGame.shownCount++;

  if (!cell.minesAroundCount && !cell.isMine) {
    renderNegsCells({ i: i, j: j });
  }
  console.log('gNonMineCellsCount', gNonMineCellsCount);
  console.log('shownCount', gGame.shownCount);
  if (
    gGame.markedCount === gLevel.MINES &&
    gGame.shownCount === gNonMineCellsCount
  ) {
    gameOver('Victory!');
  }
}

function cellMarked(elCell, i, j) {
  var cell = gBoard[i][j];
  if (cell.isShown) return;
  if (elCell.innerHTML !== FLAG) {
    cell.isMarked = true;
    elCell.innerHTML = FLAG;
    gGame.markedCount++;
  } else {
    cell.isMarked = false;
    elCell.innerHTML = '';
    gGame.markedCount--;
  }
  console.log('gNonMineCellsCount', gNonMineCellsCount);
  console.log('markedCount', gGame.markedCount);
  if (
    gGame.markedCount === gLevel.MINES &&
    gGame.shownCount === gNonMineCellsCount
  ) {
    gameOver('Victory!');
  }
}

function renderCell(elCell, pos) {
  cell = gBoard[pos.i][pos.j].isMine
    ? MINE
    : gBoard[pos.i][pos.j].minesAroundCount;
  if (cell===0) elCell.innerHTML = '';
  else elCell.innerHTML = cell;
  elCell.classList.add('shown');
}

function gameOver(result) {
  stopTimer();
  var modal = document.querySelector('.modal-container');

  modal.querySelector('.result').innerText = result;
  modal.style.display = 'block';

  gGame.isOn = false;
}

function restart() {
  document.querySelector('.modal-container').style.display = 'none';
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.isOn = true;
  init();
}
