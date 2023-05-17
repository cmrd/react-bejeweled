import colorGenerator, { COLOR_ARRAY } from "./colorGenerator"

const invalidIndices = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
const BOARDSIZE = 64
const WIDTH = 8

// check if match exists at the start of the game
const matchExists = board => {

  for (let i = 0; i < board.length; i++) {
    if ((!invalidIndices.includes(i) && board[i].color === board[i + 1].color && board[i].color === board[i + 2].color) ||
      (i < 48 && board[i].color === board[i + WIDTH].color && board[i].color === board[i + WIDTH * 2].color)) {
      return true
    }
  }
  return false
}

const generateBoard = () => {

  let board = []
  let colors = [...COLOR_ARRAY]

  for (let i = 0; i < BOARDSIZE; i++) board.push(colorGenerator())

  // Rearrange board, so there is no match at the start of the game
  while (matchExists(board)) {

    for (let i = 0; i < BOARDSIZE; i++) {
      if ((!invalidIndices.includes(i) && board[i].color === board[i + 1].color && board[i].color === board[i + 2].color) ||
        (i < 48 && board[i].color === board[i + WIDTH].color && board[i].color === board[i + WIDTH * 2].color)) {

        colors.splice(i, 1)
        board[i].color = colors[Math.floor(Math.random() * colors.length)]
        colors = [...COLOR_ARRAY]
      }
    }
  }

  return board;
}

export default generateBoard