const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let oTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        console.log("Event listener added to cell");
    });
}

function handleClick(e) {
    console.log("Cell clicked");
    const cell = e.target;
    const currentClass = oTurn ? 'O' : 'X';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function endGame(draw) {
    if (draw) {
        alert("Draw!");
    } else {
        alert(`${oTurn ? "O's" : "X's"} Wins!`);
    }
    startGame();
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}
