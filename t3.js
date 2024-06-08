// script.js
let board;
let currentPlayer;
let gameActive;

const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

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

function startGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] || !gameActive) {
        return;
    }
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes(null)) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

resetBtn.addEventListener('click', startGame);

startGame();
