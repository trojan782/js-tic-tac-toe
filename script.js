
const statusDisplay = document.querySelector('.game--status');
// declaration of some variables used to track the game state
// we will use gameActive to pause the game
let gameActive = true;
// we store our current player here
let currentPlayer = "X";
// we store our game state here
let gameState = ["", "", "", "", "", "", "", "", "",];
// some messages that will be displayd during game player
const winningMessage = () => `Player ${currentPlayer} has won 🎉`;
const drawMessage = () => `It's a draw! 😀`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn! 😁`;
// initial message to let players know whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  // update internal game state and reflect on the UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i<=7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if(a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
     if (roundDraw) {
         statusDisplay.innerHTML = drawMessage();
         gameActive = false;
         return;
     }
     handlePlayerChange();
}



function handleCellClick(clickedCellEvent) {
  // save the clicked html element in a variable
  const clickedCell = clickedCellEvent.target;
  // grab the data-cell-index attribute from the clicked cell.
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  // to check if the call has already been played, or if the game is paused
  if(gameState[clickedCellIndex] !== "" || !gameActive ) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

// Adding event listiners to the cells and the button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
