import { verticalRanges, horizontalRanges } from "./ranges"

export const handleVerticalElements = (board, index) => {

    let intercepted = []

    for (let j = 0; j < verticalRanges.length; j++) {

        if (verticalRanges[j].includes(index)) {
            verticalRanges[j].forEach(element => {

                if (board[element].level !== "lv1" && board[element].level !== "" && board[element].level !== "LT1") {
                    intercepted.push({ index: element, level: board[element].level })
                }
                    board[element].level = ""
                    board[element].flag = "removed"
            })
        }
    }
    return intercepted
}

export const handleHorizontalElements = (board, index) => {

    let intercepted = []

    for (let j = 0; j < horizontalRanges.length; j++) {
        if (horizontalRanges[j].includes(index)) {
            horizontalRanges[j].forEach(element => {

                if (board[element].level !== "lv1" && board[element].level !== "" && board[element].level !== "LT1") {
                    intercepted.push({ index: element, level: board[element].level })
                }
                    board[element].level = ""
                    board[element].flag = "removed"
            })
        }
    }
    return intercepted
}

export const handleLT2Elements = (board, index, currentBoard) => {

    let intercepted = []
    let atVerticalRange = 0

    for (let j = 0; j < verticalRanges.length; j++) {
        if (verticalRanges[j].includes(index)) atVerticalRange = j
    }

    let affectedArea = [
        index - 8,
        index + 8,
    ]

    if (atVerticalRange - 1 >= 0) {
        affectedArea.push(
            index - 1,
            index + 8 - 1,
            index - 8 - 1)
    }

    if (atVerticalRange + 1 < 8) {
        affectedArea.push(
            index + 1,
            index + 8 + 1,
            index - 8 + 1)
    }

    affectedArea = affectedArea.filter(value => value >= 0 && value < 64)

    board[index].color = currentBoard[index].color
    board[index].level = "LT1"
    board[index].flag = ""

    affectedArea.forEach(element => {
        if (board[element].level === "LT2") board[element].level = "LT1"
        else if (board[element].level !== "LT1") board[element].flag = "removed"

        if (board[element].level !== "lv1" && board[element].level !== "" && board[element].level !== "LT1") {
            intercepted.push({ index: element, level: board[element].level })
        }
    })
    return intercepted
}

export const handleLT1Elements = (board, index) => {

    let intercepted = []
    let atVerticalRange = 0

    for (let j = 0; j < verticalRanges.length; j++) {
        if (verticalRanges[j].includes(index)) atVerticalRange = j
    }

    let affectedArea = [
        index,
        index - 8,
        index + 8
    ]

    if (atVerticalRange - 1 >= 0) {
        affectedArea.push(
            index - 1,
            index + 8 - 1,
            index - 8 - 1)
    }

    if (atVerticalRange + 1 < 8) {
        affectedArea.push(
            index + 1,
            index + 8 + 1,
            index - 8 + 1)
    }

    affectedArea = affectedArea.filter(value => value >= 0 && value < 64)

    affectedArea.forEach(element => {

        if (board[element].level !== "lv1" && board[element].level !== "") {
            intercepted.push({ index: element, level: board[element].level })
        }

        board[element].flag = "removed"
        board[element].level = ""
    })
    return intercepted
}

export const handleInterceptedElements = (interceptedElements, board, currentBoard) => {

    while (interceptedElements.length > 0) {

        let length = interceptedElements.length
        let intercepted = []

        for (let i = 0; i < length; i++) {

            switch (interceptedElements[i].level) {

                case "lv2_v":
                    intercepted = intercepted.concat(handleVerticalElements(board, interceptedElements[i].index))
                    break

                case "lv2_h":
                    intercepted = intercepted.concat(handleHorizontalElements(board, interceptedElements[i].index))
                    break

                case "LT2":
                    intercepted = intercepted.concat(handleLT2Elements(board, interceptedElements[i].index, currentBoard))
                    break

                case "LT1":
                    intercepted = intercepted.concat(handleLT1Elements(board, interceptedElements[i].index))
                    break

                default:
                    continue
            }
        }
        interceptedElements.splice(0, length)
        interceptedElements = interceptedElements.concat(intercepted)
    }
}