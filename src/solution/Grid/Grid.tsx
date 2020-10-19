import React from 'react';
import './Grid.css';
import { Position } from '../types';

interface ChipData {
    top: number;
    left: number;
    centerX: number;
    centerY: number;
    radius: number;
    strokeWidth: number;
}

interface GridProps {
    availableCells: (0 | 1)[][];
    cellSize?: number;
    targetPosition: Position;
    startingPosition: Position;
    currentPosition: Position;
    borderWidth?: number;
}

const Grid = (props: GridProps) => {
    const { availableCells, cellSize, startingPosition, targetPosition, currentPosition, borderWidth } = props;
    const positiveBorderWidth = borderWidth >= 0 ? borderWidth : 0;
    const positiveCellSize = cellSize > 16 ? cellSize : 16;

    const isPositionEqual = (p1: Position, p2: Position): boolean => {
        return p1[0] === p2[0] && p1[1] === p2[1];
    };

    const getCellClasses = (cellValue: (0 | 1), p: Position): string => {
        let gridClasses = 'grid__cell';
        if (cellValue === 0) {
            gridClasses = `${gridClasses} grid__cell--blocked`;
        }
        if (isPositionEqual(p, startingPosition)) {
            gridClasses = `${gridClasses} grid__cell--start`;
        };
        if (isPositionEqual(p, targetPosition)) {
            gridClasses = `${gridClasses} grid__cell--finish`;
        };
        return gridClasses;
    };

    const chipDrawData: ChipData = {
        top: borderWidth + Math.floor(currentPosition[0] * (positiveCellSize + borderWidth)),
        left: borderWidth + Math.floor(currentPosition[1] * (positiveCellSize + borderWidth)),
        centerX: (positiveCellSize + (borderWidth / 2)) * 0.5,
        centerY: (positiveCellSize + (borderWidth / 2)) * 0.5,
        radius: 0.3 * positiveCellSize,
        strokeWidth: borderWidth,
    };

    return (
        <div className="grid" style={{ borderWidth: positiveBorderWidth }}>
            {availableCells.map((row, rowIndex) =>
                <div className="grid__row" key={`grid-row-${rowIndex}`} style={{ borderWidth: positiveBorderWidth }}>
                    {row.map((cell, columnIndex) =>
                        <div className={getCellClasses(cell, [rowIndex, columnIndex])}
                            key={`grid__row-${rowIndex}-${columnIndex}`} style={{ width: positiveCellSize, height: positiveCellSize, borderWidth: positiveBorderWidth }}>
                        </div>
                    )}
                </div>
            )}
            <picture className="player-chip" style={{ top: chipDrawData.top, left: chipDrawData.left }}>
                <svg height={positiveCellSize} width={positiveCellSize}>
                    <circle cx={chipDrawData.centerX} cy={chipDrawData.centerY} r={chipDrawData.radius} strokeWidth={chipDrawData.strokeWidth} className="player-chip__svg" />
                </svg>
            </picture>
        </div>
    )
};

export default Grid;