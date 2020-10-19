import React, { useState, useEffect } from "react";
import './Labyrinth.css';
import Grid from '../Grid/Grid';
import Score from '../Score/Score';
import { Position, GameStatus } from '../types';

export interface LabyrinthProps {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
}

// Use key effect
const useKey = () => {
  const [key, setKey] = useState(null);

  useEffect(() => {
    const onKeyPress = (event: any) => {
      event.preventDefault();
      setKey(event.key);
    }

    const onKeyRelease = (event: any) => {
      event.preventDefault();
      console.log(event);
      setKey(null);
    }


    window.addEventListener("keydown", onKeyPress)
    window.addEventListener("keyup", onKeyRelease)
    return () => {
      window.removeEventListener("keydown", onKeyPress)
      window.removeEventListener("keyup", onKeyRelease)
    }
  }, [])

  return key;
}

const Labyrinth = (props: LabyrinthProps) => {
  const { availableCells, cellSize, startingPosition, targetPosition, moveLimit } = props;
  const borderWidth = 3;
  const title = "Making Sense's LABYRINTH";

  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>(startingPosition);
  const [movesLeft, setMovesLeft] = useState<number>(moveLimit);
  const [gameStatus, setGameStatus] = useState<GameStatus>({ finished: false, won: false });

  const onRestart = () => {
    setMovesLeft(moveLimit);
    setCurrentPosition(startingPosition);
    setGameStatus({ finished: false, won: false });
  }

  // Check if a movement goes oputside bounds or into an invalid cell
  const isMoveValid = (position: Position) => {
    return position[0] >= 0 && position[0] < availableCells.length
      && position[1] >= 0 && position[1] < availableCells[0].length
      && availableCells[position[0]][position[1]];
  }

  // Handle key press
  let positonChange: Position;
  const newKeyPressed = useKey();
  if (!gameStatus.finished && keyPressed !== newKeyPressed) {
    setKeyPressed(newKeyPressed);
    switch (newKeyPressed) {
      case 'ArrowUp':
        positonChange = [-1, 0];
        break;
      case 'ArrowDown':
        positonChange = [1, 0];
        break;
      case 'ArrowLeft':
        positonChange = [0, -1];
        break;
      case 'ArrowRight':
        positonChange = [0, 1];
        break;
    }
  }
  if (positonChange) {
    const newPosition: Position = [currentPosition[0] + positonChange[0], currentPosition[1] + positonChange[1]];
    if (isMoveValid(newPosition)) {
      const newMovesLeft = movesLeft - 1;
      setCurrentPosition(newPosition);
      setMovesLeft(newMovesLeft);
      const isFinished = newMovesLeft === 0 || (newPosition[0] === targetPosition[0] && newPosition[1] === targetPosition[1]);
      if (isFinished) {
        setGameStatus({
          finished: isFinished,
          won: newPosition[0] === targetPosition[0] && newPosition[1] === targetPosition[1]
        });
      }
    }
  }

  return (
    <main className="labyrinth">
      <header>
        <h2 className="labyrinth__title">{title}</h2>
      </header>
      <Grid availableCells={availableCells} cellSize={cellSize} startingPosition={startingPosition} targetPosition={targetPosition} currentPosition={currentPosition} borderWidth={borderWidth}></Grid>
      <Score startingPosition={startingPosition} targetPosition={targetPosition} currentPosition={currentPosition} movesLeft={movesLeft} gameStatus={gameStatus} onRestart={onRestart}></Score>
    </main>
  );
};

export default Labyrinth;
