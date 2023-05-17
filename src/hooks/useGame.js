import { useEffect, useState, useRef } from "react"

import generateBoard from "../business/boardGenerator";
import monitorMatches from "../business/monitorMatches"
import refillBoard from "../business/refillBoard"

const useGame = () => {

    const [board, setBoard] = useState(() => {
        return JSON.parse(localStorage.getItem("board")) || generateBoard()
    })

    const [score, setScore] = useState(() => {
        return JSON.parse(localStorage.getItem("score")) || 0
    })

    const previousBoard = useRef(board)

    useEffect(() => {
        const timer = setInterval(() => {

                localStorage.setItem("board", JSON.stringify(board))
                localStorage.setItem("score", JSON.stringify(score))

            if (board.every(element => element.color !== "")) {

                const [currentBoard, scoreAccumulator] = monitorMatches(board, previousBoard.current)
                setBoard(currentBoard)
                setScore(previousScore => previousScore + scoreAccumulator)

            }
            setBoard(prev => refillBoard(prev))
        }, 100);

        return () => clearInterval(timer)
    }, [board, score])

    return [board, setBoard, score, setScore]
}

export default useGame