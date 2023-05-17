import {
    handleInterceptedElements,
    handleVerticalElements,
    handleHorizontalElements,
    handleLT2Elements,
    handleLT1Elements
} from "./handleAdvancedElements"

import { columns, rows } from "./matches"

import addScore from "./scoreSystem"

const monitorMatches = (currentBoard, previousBoard) => {

    let score = 0
    let interceptedAdvancedElements = []

    const board = JSON.parse(JSON.stringify(currentBoard))

    board.forEach(element => {

        if (element.flag === "removed") {
            element.color = ""
            score += addScore(element.level)

        }
    })

    if (score > 0) return [board, score]

    const [col5, col4, col3] = columns(board)
    const [row5, row4, row3] = rows(board)
    const indices = [...col5, ...col4, ...col3, ...row5, ...row4, ...row3]

 
    const LTShape = col3.filter(element => row3.includes(element))
    const lv2HorizontalElements = indices.filter(element => board[element].level === "lv2_h")
    const lv2VerticalElements = indices.filter(element => board[element].level === "lv2_v")
    const LTShapedElementsLv2 = indices.filter(element => board[element].level === "LT2")

    const LTShapedElementsLv1 = board.reduce((accumulator, current, index) => {
        if (current.level === "LT1") accumulator.push(index)
        return accumulator
    }, [])

    indices.forEach(element => board[element].flag = "removed")

    for (let i = 0; i < lv2VerticalElements.length; i++) {
        score += addScore(board[lv2VerticalElements[i]].level)
        interceptedAdvancedElements = interceptedAdvancedElements.concat(handleVerticalElements(board, lv2VerticalElements[i]))
    }

    for (let i = 0; i < lv2HorizontalElements.length; i++) {
        score += addScore(board[lv2HorizontalElements[i]].level)
        interceptedAdvancedElements = interceptedAdvancedElements.concat(handleHorizontalElements(board, lv2HorizontalElements[i]))
    }

    for (let i = 0; i < LTShapedElementsLv2.length; i++) {
        score += addScore(board[LTShapedElementsLv2[i]].level)
        interceptedAdvancedElements = interceptedAdvancedElements.concat(handleLT2Elements(board, LTShapedElementsLv2[i], currentBoard))
    }

    for (let i = 0; i < LTShapedElementsLv1.length; i++) {
        score += addScore(board[LTShapedElementsLv1[i]].level)
        interceptedAdvancedElements = interceptedAdvancedElements.concat(handleLT1Elements(board, LTShapedElementsLv1[i]))
    }

    handleInterceptedElements(interceptedAdvancedElements, board, currentBoard)


    let row4Counter = -1

    for (let i = 0; i < row4.length; i++) {
        row4Counter++
        if (currentBoard[row4[i]].color !== previousBoard[row4[i]].color) {
            board[row4[i]].color = currentBoard[row4[i]].color
            board[row4[i]].level = "lv2_h"
            board[row4[i]].flag = ""
            i = i - row4Counter + 3
            row4Counter = -1
            score++
        }
    }

    for (let i = 0; i < col4.length; i += 4) {
        board[col4[i]].color = currentBoard[col4[i]].color
        board[col4[i]].level = "lv2_v"
        board[col4[i]].flag = ""
        score++
    }

    for (let i = 0; i < row5.length; i += 5) {
        board[row5[i + 2]].color = "white"
        board[row5[i + 2]].level = "lv3"
        board[row5[i + 2]].flag = ""
        score++
    }

    for (let i = 0; i < col5.length; i += 5) {
        board[col5[i + 4]].color = "white"
        board[col5[i + 4]].level = "lv3"
        board[col5[i + 4]].flag = ""
        score++
    }

    for (let i = 0; i < LTShape.length; i++) {
        board[LTShape[i]].color = currentBoard[LTShape[i]].color
        board[LTShape[i]].level = "LT2"
        board[LTShape[i]].flag = ""
        score++
    }

    board.forEach(element => {
        if (element.color === "") score += addScore(element.level)
    })

    return [board, score]
}

export default monitorMatches