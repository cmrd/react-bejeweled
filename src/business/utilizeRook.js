import { verticalRanges, horizontalRanges } from "./ranges"
import { handleInterceptedElements } from "./handleAdvancedElements"

export const utilizeRook = (selectedItem, currentBoard) => {

    const board = JSON.parse(JSON.stringify(currentBoard))

    let interceptedAdvancedElements = []

    for (let i = 0; i < horizontalRanges.length; i++) {

        if (horizontalRanges[i].includes(selectedItem)) {
            horizontalRanges[i].forEach(element => {
                board[element].flag = "removed"
                if (board[element].level !== "lv1" && board[element].level !== "") {
                    interceptedAdvancedElements.push({ index: element, level: board[element].level })
                }
            });
            break
        }

    }

    for (let i = 0; i < verticalRanges.length; i++) {

        if (verticalRanges[i].includes(selectedItem)) {
            verticalRanges[i].forEach(element => {
                board[element].flag = "removed"
                if (board[element].level !== "lv1" && board[element].level !== "") {
                    interceptedAdvancedElements.push({ index: element, level: board[element].level })
                }
            })
            break
        }
    }

    handleInterceptedElements(interceptedAdvancedElements, board, currentBoard)

    return board
}