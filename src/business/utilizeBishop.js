import { handleInterceptedElements } from "./handleAdvancedElements"

import { verticalRanges, horizontalRanges } from "./ranges"

export const utilizeBishop = (selectedItem, currentBoard) => {

    const board = JSON.parse(JSON.stringify(currentBoard))
    let interceptedAdvancedElements = []

    let atVerticalRange = -1
    let atHorizontalRange = -1

    let matches = []

    for (let i = 0; i < verticalRanges.length; i++) {
        if (verticalRanges[i].includes(selectedItem)) atVerticalRange = i
        if (horizontalRanges[i].includes(selectedItem)) atHorizontalRange = i
        if (atVerticalRange !== -1 && atHorizontalRange !== -1) break
    }

    //up right

    for (let i = 0; i < 8; i++) {

        if (atVerticalRange + i >= 8 || atHorizontalRange - i < 0) break

        matches.push(...verticalRanges[atVerticalRange + i].filter(element => horizontalRanges[atHorizontalRange - i].includes(element)))
    }

    //up left

    for (let i = 0; i < 8; i++) {

        if (atVerticalRange - i < 0 || atHorizontalRange - i < 0) break

        matches.push(...verticalRanges[atVerticalRange - i].filter(element => horizontalRanges[atHorizontalRange - i].includes(element)))
    }

    //down right

    for (let i = 0; i < 8; i++) {

        if (atVerticalRange + i >= 8 || atHorizontalRange + i >= 8) break

        matches.push(...verticalRanges[atVerticalRange + i].filter(element => horizontalRanges[atHorizontalRange + i].includes(element)))
    }

    //down left

    for (let i = 0; i < 8; i++) {

        if (atVerticalRange - i < 0 || atHorizontalRange + i >= 8) break

        matches.push(...verticalRanges[atVerticalRange - i].filter(element => horizontalRanges[atHorizontalRange + i].includes(element)))
    }

    matches.forEach(element => {
        board[element].flag = "removed"
        if (board[element].level !== "lv1" && board[element].level !== "") {
            interceptedAdvancedElements.push({ index: element, level: board[element].level })
        }
    })

    handleInterceptedElements(interceptedAdvancedElements, board, currentBoard)

    return board
}