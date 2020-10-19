import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Labyrinth from "./solution/Labyrinth/Labyrinth";
import { LabyrinthProps } from "./solution/Labyrinth/Labyrinth";

describe("Labyrinth", () => {
  let props: LabyrinthProps;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });

  it("should win", () => {
    const { container, getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );
    expect(getByTestId("moves-message").textContent).toEqual("moves left 10");
    const movements = ['ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowRight'];
    movements.forEach(m => {
      fireEvent.keyDown(window, { key: m });
      fireEvent.keyUp(window, { key: m });
    });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 2");
    expect(queryByTestId("win-message")).toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should lose", () => {
    const { container, getByTestId, queryByTestId } = render(
      <Labyrinth {...props} moveLimit={2} />
    );
    const movements = ['ArrowRight', 'ArrowRight'];
    movements.forEach(m => {
      fireEvent.keyDown(window, { key: m });
      fireEvent.keyUp(window, { key: m });
    });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 0");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).toBeTruthy();
  });
});
