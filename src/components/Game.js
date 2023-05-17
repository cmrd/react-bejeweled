// COMPONENTS
import GameWrapper from "./GameWrapper"
import HeaderPanel from "./HeaderPanel"
import Board from "./Board"
import ButtonPanel from "./ButtonPanel"
import Score from "./Score"
import RestartGame from "./RestartGame"

// CUSTOM HOOKS
import useGame from "../hooks/useGame"
import useGameOver from "../hooks/useGameOver"

// BUILT IN HOOKS
import { useReducer } from "react"

// REDUCER FUNCTION & STATE
import { initialState, handleState } from "../business/jokerState"


const Game = () => {

    const [board, setBoard, score, setScore] = useGame()
    const [jokerState, dispatchJokerAction] = useReducer(handleState, JSON.parse(localStorage.getItem("jokerState")) || initialState)
    const [gameOver, setGameOver] = useGameOver(board, jokerState)

    return (
        <GameWrapper gameState={gameOver}>
            <HeaderPanel>
                <Score score={score} />
                <ButtonPanel jokers={jokerState} dispatchJokerAction={dispatchJokerAction} />
            </HeaderPanel>
            <Board
                board={board}
                setBoard={setBoard}
                jokers={jokerState}
                dispatchJokerAction={dispatchJokerAction}
                gameOver={gameOver} />
            <RestartGame
                resetBoard={setBoard}
                resetScore={setScore}
                resetJokers={dispatchJokerAction}
                resetGameOver={setGameOver} />
        </GameWrapper>
    )
}

export default Game