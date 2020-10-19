import React from "react";
import './Score.css';
import { Position, GameStatus } from '../types';

export interface ScoreProps {
    targetPosition: Position;
    startingPosition: Position;
    movesLeft: number;
    currentPosition: Position;
    gameStatus: GameStatus;
    onRestart: () => void;
}

const Score = (props: ScoreProps) => {
    const { movesLeft, gameStatus, onRestart } = props;
    return (
        <footer className="score">
            <div className="score__status">
                <span>
                    {(gameStatus.finished && gameStatus.won) && <span data-testid="win-message">You won</span>}
                    {(gameStatus.finished && !gameStatus.won) && <span data-testid="lose-message">You lost</span>}
                </span>
                <span data-testid="moves-message">moves left {movesLeft}</span>
            </div>
            <div className="score__controls">
                <button className="score__restart-button" type="button" onClick={onRestart}>Restart</button>
            </div>
        </footer>
    );
};

export default Score;
