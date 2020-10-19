import React from "react";
import './Footer.css';
import { Position, GameStatus } from '../types';

export interface FooterProps {
    targetPosition: Position;
    startingPosition: Position;
    movesLeft: number;
    currentPosition: Position;
    gameStatus: GameStatus;
    onRestart: () => void;
}

const Footer = (props: FooterProps) => {
    const { movesLeft, gameStatus, onRestart } = props;
    return (
        <footer className="footer">
            <div className="footer__game-status">
                <span>
                    {(gameStatus.finished && gameStatus.won) && <span data-testid="win-message">You won</span>}
                    {(gameStatus.finished && !gameStatus.won) && <span data-testid="lose-message">You lost</span>}
                </span>
                <span data-testid="moves-message">moves left {movesLeft}</span>
            </div>
            <div className="footer__controls">
                <button className="footer__restart-button" type="button" onClick={onRestart}>Restart</button>
            </div>
        </footer>
    );
};

export default Footer;
