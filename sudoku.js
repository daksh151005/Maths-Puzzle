function generateSudoku() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillGrid(grid);
    removeNumbers(grid); // Remove numbers to create an unsolved puzzle
    return grid;
}

function fillGrid(grid) {
    // Simple backtracking algorithm to fill the grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                const numbers = shuffleArray([...Array(9).keys()].map(n => n + 1));
                for (const num of numbers) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) {
                            return true;
                        }
                        grid[row][col] = 0; // Backtrack
                    }
                }
                return false; // Trigger backtrack
            }
        }
    }
    return true; // Successfully filled the grid
}

function isSafe(grid, row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displaySudoku(grid) {
    const sudokuBoard = document.getElementById('sudoku-board');
    sudokuBoard.innerHTML = ''; // Clear previous cells
    grid.forEach(row => {
        row.forEach(num => {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.className = 'sudoku-cell';
            cell.maxLength = 1;
            cell.value = num !== 0 ? num : ''; // Show number if not empty
            sudokuBoard.appendChild(cell);
        });
    });
}

function removeNumbers(grid) {
    const cellsToRemove = 40; // Number of cells to remove for the unsolved puzzle
    let count = 0;
    while (count < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            grid[row][col] = 0; // Remove the number
            count++;
        }
    }
}

// Generate and display the Sudoku puzzle on page load
document.addEventListener('DOMContentLoaded', () => {
    const sudokuGrid = generateSudoku();
    displaySudoku(sudokuGrid);
});
