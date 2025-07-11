#!/bin/bash
cd /tmp/kavia/workspace/code-generation/sudoku-web-player-98601e3b/sudoku_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

