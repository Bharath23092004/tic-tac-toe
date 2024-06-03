let board;
const playerX = 'X';
const playerO = 'O';
let currentPlayer = playerX;
let gameActive = true;
let vsComputer = false;

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

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const switchModeButton = document.getElementById('switch-mode');
const messageElement = document.getElementById('message');

initializeGame();

function initializeGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleCellClick);
    });
    gameActive = true;
    currentPlayer = playerX;
    messageElement.innerText = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', initializeGame);
switchModeButton.addEventListener('click', switchMode);

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (board[index] || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        messageElement.innerText = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        gameActive = false;
        messageElement.innerText = 'It\'s a tie!';
    } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        messageElement.innerText = `Player ${currentPlayer}'s turn`;

        if (vsComputer && currentPlayer === playerO) {
            computerMove();
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function switchMode() {
    vsComputer = !vsComputer;
    initializeGame();
    switchModeButton.innerText = vsComputer ? 'Switch to Player vs. Player' : 'Switch to Player vs. Computer';
}

function computerMove() {
    let availableIndices = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
    let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[randomIndex] = playerO;
    cells[randomIndex].innerText = playerO;

    if (checkWin()) {
        gameActive = false;
        messageElement.innerText = `Player ${playerO} wins!`;
    } else if (board.every(cell => cell)) {
        gameActive = false;
        messageElement.innerText = 'It\'s a tie!';
    } else {
        currentPlayer = playerX;
        messageElement.innerText = `Player ${currentPlayer}'s turn`;
    }
}
