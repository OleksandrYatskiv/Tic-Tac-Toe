const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayer = 'X';

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent == '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        if (checkWin(currentPlayer)) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetBoard();
            }, 100);
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert(`It's a tie!`);
                resetBoard();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

function checkWin(player) {
    return winningCombinations.some((combination) => {
        return combination.every((index) => cells[index].textContent === player);
    });
}

function isBoardFull() {
    return [...cells].every((cell) => cell.textContent !== '');
}

function resetBoard() {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('o', 'x');
    });
    currentPlayer = 'X';
}

function makeAIMove() {
    const emptyCells = [...cells].filter((cell) => cell.textContent === '');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];

    setTimeout(() => {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        if (checkWin(currentPlayer)) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetBoard();
            }, 100);
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert(`It's a tie!`);
                resetBoard();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }, 500);
}