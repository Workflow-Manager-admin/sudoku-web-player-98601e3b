import React from 'react';

// PUBLIC_INTERFACE
const Controls = ({ onReset, onHint, onSolve }) => {
  return (
    <div className="controls">
      <button onClick={onReset} className="control-button">
        Reset Board
      </button>
      <button onClick={onHint} className="control-button">
        Get Hint
      </button>
      <button onClick={onSolve} className="control-button">
        Solve
      </button>
    </div>
  );
};

export default Controls;
