/*2D position*/
export type Position = [/** row */ number, /** col */ number];

export interface GameStatus {
    finished: boolean;
    won: boolean;
}