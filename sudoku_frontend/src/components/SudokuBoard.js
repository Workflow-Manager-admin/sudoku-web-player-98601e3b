import React from 'react';

// PUBLIC_INTERFACE
const SudokuBoard = ({ board, onCellChange, initialBoard }) => {
  const isInitialCell = (row, col) => initialBoard[row][col] !== 0;

  const handleChange = (row, col, value) => {
    const newValue = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;
    onCellChange(row, col, newValue);
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className={`sudoku-cell ${isInitialCell(rowIndex, colIndex) ? 'initial' : ''} 
                ${(rowIndex + 1) % 3 === 0 ? 'border-bottom' : ''} 
                ${(colIndex + 1) % 3 === 0 ? 'border-right' : ''}`}
              disabled={isInitialCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
