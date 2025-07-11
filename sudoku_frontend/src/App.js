import React, { useState, useEffect } from 'react';
import './App.css';
import SudokuBoard from './components/SudokuBoard';
import Controls from './components/Controls';
import { isValidMove, solveSudoku, getRandomHint } from './utils/sudokuUtils';

// Example initial board (0 represents empty cells)
const initialBoard = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(initialBoard.map(row => [...row]));
  const [solution, setSolution] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Calculate solution when component mounts
    const solvedBoard = solveSudoku(initialBoard.map(row => [...row]));
    setSolution(solvedBoard);
  }, []);

  const handleCellChange = (row, col, value) => {
    if (value === 0 || isValidMove(board, row, col, value)) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = value;
      setBoard(newBoard);
      setMessage('');
    } else {
      setMessage('Invalid move! This number already exists in the row, column, or box.');
    }
  };

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row]));
    setMessage('');
  };

  const handleHint = () => {
    if (!solution) return;
    const hint = getRandomHint(board, solution);
    if (hint) {
      setMessage(`Hint: ${hint.value} goes in row ${hint.row + 1}, column ${hint.col + 1}`);
    } else {
      setMessage('No more hints available!');
    }
  };

  const handleSolve = () => {
    if (solution) {
      setBoard(solution.map(row => [...row]));
      setMessage('Puzzle solved!');
    }
  };

  return (
    <div className="App">
      <h1 className="game-title">Sudoku</h1>
      <SudokuBoard 
        board={board}
        initialBoard={initialBoard}
        onCellChange={handleCellChange}
      />
      <Controls 
        onReset={handleReset}
        onHint={handleHint}
        onSolve={handleSolve}
      />
      {message && <div className="hint-message">{message}</div>}
    </div>
  );
}

export default App;
