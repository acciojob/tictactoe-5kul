//your JS code here. If required.
let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let gameOver = false;
const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

document.getElementById('submit').addEventListener('click', function () {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  document.getElementById('player-form').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  currentPlayer = player1;
  currentSymbol = 'X';
  updateMessage(`${currentPlayer}, you're up`);

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleCellClick);
  });
});

function updateMessage(msg) {
  document.querySelector('.message').innerText = msg;
}

function handleCellClick(e) {
  if (gameOver) return;

  const cell = e.target;
  if (cell.innerText !== '') return;

  cell.innerText = currentSymbol;

  if (checkWinner(currentSymbol)) {
    updateMessage(`${currentPlayer}, congratulations you won!`);
    gameOver = true;
    return;
  }

  switchTurn();
}

function switchTurn() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = 'O';
  } else {
    currentPlayer = player1;
    currentSymbol = 'X';
  }
  updateMessage(`${currentPlayer}, you're up`);
}

function checkWinner(symbol) {
  const cells = document.querySelectorAll('.cell');
  const filledPositions = [];

  cells.forEach(cell => {
    if (cell.innerText === symbol) {
      filledPositions.push(parseInt(cell.id));
    }
  });

  return winningCombinations.some(combination =>
    combination.every(pos => filledPositions.includes(pos))
  );
}
