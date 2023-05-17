
import { useEffect, useState } from "react";

import monitorBoard from "../business/monitorBoard";

const useGameOver = (board, state) => {

    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {

        if (!gameOver &&
            board.every(element => element.color !== "" && element.flag !== "removed") &&
            state.rook.disabled &&
            state.bishop.disabled &&
            state.knight.disabled &&
            state.queen.disabled &&
            !monitorBoard(board)) {

            setGameOver(gameOver => !gameOver)
        }

    }, [board, gameOver, state.rook.disabled, state.bishop.disabled, state.knight.disabled, state.queen.disabled])

    return [gameOver, setGameOver]
}

export default useGameOver