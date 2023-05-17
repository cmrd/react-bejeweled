
import { utilizeRook } from "./utilizeRook"
import { utilizeBishop } from "./utilizeBishop"

export const utilizeQueen = (selectedItem, currentBoard) => {

    let board = JSON.parse(JSON.stringify(currentBoard))

    board = utilizeRook(selectedItem, board)
    board = utilizeBishop(selectedItem, board)



    return board
}