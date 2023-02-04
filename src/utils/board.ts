import { BoardResult, BoardState, Moves } from "./types";
export const printFormattedBoard = (state: BoardState) => {
  let formattedString = "";
  state.forEach((cell, index) => {
    formattedString += cell ? `${cell} | ` : " |";

    if ((index + 1) % 3 == 0) {
      formattedString = formattedString.slice(0, -1);
      if (index < 8) {
        formattedString +=
          "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    }
  });
  console.log(formattedString);
};

export const isEmpty = (state: BoardState): boolean => {
  return state.every((cell) => cell === null);
};

export const isFull = (state: BoardState): boolean => {
  return state.every((cell) => cell);
};

export const getAvailableMoves = (state: BoardState) => {
  const moves: Moves[] = [];
  state.forEach((cell, index) => {
    cell === null ? moves.push(index as Moves) : null;
  });
  return moves;
};

export const isTerminal = (state: BoardState): BoardResult | false => {
  if (isEmpty(state)) return false;
  const winninglines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winninglines.length; i++) {
    const line = winninglines[i];
    const [cell1, cell2, cell3] = line;

    if (
      state[cell1] &&
      state[cell1] === state[cell2] &&
      state[cell1] == state[cell3]
    ) {
      const result: BoardResult = {
        winner: state[cell1],
      };
      if (i < 3) {
        (result.direction = "H"), (result.row = i === 0 ? 1 : i === 1 ? 2 : 3);
      }
      if (i >= 3 && i <= 5) {
        (result.direction = "V"),
          (result.column = i === 3 ? 1 : i === 4 ? 2 : 3);
      }
      if (i >= 6) {
        (result.direction = "D"),
          (result.diagonal = i === 6 ? "MAIN" : "COUNTER");
      }
      return result;
    }
  }
  if (isFull(state)) return { winner: null };
  return false;
};
