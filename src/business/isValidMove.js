import { verticalRanges } from "./ranges"

const invalidIndices = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]

const isValidMove = (firstElement, secondElement, initialBoard) => {

    const board = [...initialBoard]

    let atVerticalRange = - 1
    
    for (let i = 0; i < verticalRanges.length; i++) {
        if (verticalRanges[i].includes(firstElement)) {
            atVerticalRange = i
            break
        }
    }

    const rightElement = atVerticalRange + 1 < 8 ? firstElement + 1 : -1
    const leftElement = atVerticalRange - 1 >= 0 ? firstElement - 1 : -1

    const validMoves = [
        rightElement,
        leftElement,
        firstElement + 8,
        firstElement - 8
    ].filter(value => value >= 0 && value < 64)

    if (!validMoves.includes(secondElement)) return false

    if (board[firstElement].level === "lv3" || board[secondElement].level === "lv3") return true

    board[firstElement] = initialBoard[secondElement]
    board[secondElement] = initialBoard[firstElement]

    for (let i = 0; i < 48; i++) {
        if (board[i].color === board[i + 8].color && board[i].color === board[i + 8 * 2].color) {
            return true
        }
    }
    for (let i = 0; i < 64; i++) {
        if (invalidIndices.includes(i)) continue
        if (board[i].color === board[i + 1].color && board[i].color === board[i + 2].color) {
            return true
        }
    }
    return false
}

export default isValidMove