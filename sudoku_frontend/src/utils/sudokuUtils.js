// PUBLIC_INTERFACE
export const isValidMove = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num && x !== col) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num && x !== row) return false;
  }

  // Check 3x3 box
  let startRow = row - (row % 3), startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num && 
          (i + startRow !== row || j + startCol !== col)) return false;
    }
  }

  return true;
};

// PUBLIC_INTERFACE
export const solveSudoku = (board) => {
  const solve = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const solution = board.map(row => [...row]);
  solve(solution);
  return solution;
};

// PUBLIC_INTERFACE
export const getRandomHint = (board, solution) => {
  const emptySpots = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        emptySpots.push([i, j]);
      }
    }
  }
  if (emptySpots.length === 0) return null;
  const randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  return {
    row: randomSpot[0],
    col: randomSpot[1],
    value: solution[randomSpot[0]][randomSpot[1]]
  };
};
