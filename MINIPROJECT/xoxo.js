 let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(cell, index) {
  // Stop if cell is already filled or the game is finished
  if (cell.innerText !== "" || gameOver) return;

  cell.innerText = currentPlayer;
  board[index] = currentPlayer;

  // Check for win
  if (checkWinner()) {
    document.getElementById("status").innerText = currentPlayer + " wins!";
    gameOver = true;
    return;
  }

  // Check for draw
  if (!board.includes("")) {
    document.getElementById("status").innerText = "It's a draw!";
    gameOver = true;
    return;
  }

  // Switch turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").innerText = "Player Turn: " + currentPlayer;
}

function checkWinner() {
  const patterns = [
    [0,1,2], [3,4,5], [6,7,8],   // rows
    [0,3,6], [1,4,7], [2,5,8],   // columns
    [0,4,8], [2,4,6]             // diagonals
  ];

  for (let p of patterns) {
    const [a, b, c] = p;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;

  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
  document.getElementById("status").innerText = "Player Turn: X";
}
