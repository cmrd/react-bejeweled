// STYLES
import BoardStyles from "./css_modules/BoardStyles.module.css"

// COMPONENTS
import Element from "./Element"

// CUSTOM HOOKS
import useElement from "../hooks/useElement"

// JOKER FUNCTIONS
import { utilizeRook } from "../business/utilizeRook"
import { utilizeBishop } from "../business/utilizeBishop"
import { utilizeKnight } from "../business/utilizeKnight"
import { utilizeQueen } from "../business/utilizeQueen"

// FUNCTIONS
import isValidMove from "../business/isValidMove"
import { handleInterceptedElements } from "../business/handleAdvancedElements"


const Board = ({ board, setBoard, jokers, dispatchJokerAction, gameOver }) => {

    const [firstElement, secondElement] = useElement()

    // Function to be executed as a click event for each element on the board, that was selected
    const handleElementState = index => {

        // create a copy of the state object to operate with, as it is discouraged to operate with the state itself
        // As board is an array holding objects, simply destructuring it isn't enough, we need to create a deep copy.
        let currentBoard = JSON.parse(JSON.stringify(board))

        // Elements can only be selected once board is (re)filled with Elements
        if (currentBoard.every(element => element.color !== "")) {

            // Select first Element
            if (firstElement.current === null) {
                firstElement.current = index

                // If the first Element is selected while a Joker is active,
                // utilize Joker, reset Board and set the first Element to null again. Each Joker can only be utilized once
                if (jokers.rook.status === "selected") {
                    dispatchJokerAction({ type: "ROOK_UTILIZED" })
                    setBoard(utilizeRook(firstElement.current, currentBoard))
                    firstElement.current = null
                } else if (jokers.bishop.status === "selected") {
                    dispatchJokerAction({ type: "BISHOP_UTILIZED" })
                    setBoard(utilizeBishop(firstElement.current, currentBoard))
                    firstElement.current = null
                } else if (jokers.knight.status === "selected") {
                    dispatchJokerAction({ type: "KNIGHT_UTILIZED" })
                    setBoard(utilizeKnight(firstElement.current, currentBoard))
                    firstElement.current = null
                } else if (jokers.queen.status === "selected") {
                    dispatchJokerAction({ type: "QUEEN_UTILIZED" })
                    setBoard(utilizeQueen(firstElement.current, currentBoard))
                    firstElement.current = null
                }
            }

            // Select second Element, if first Element is declared as selected
            else if (firstElement.current !== null && secondElement.current === null) secondElement.current = index

            // If both Elements are selected, check if move was valid. If move is not valid, set selected Elements to null again
            if (firstElement.current !== null && secondElement.current !== null &&
                !isValidMove(firstElement.current, secondElement.current, board)) {
                firstElement.current = null
                secondElement.current = null
            }

            // If both Elements are selected and make up a valid move
            if (firstElement.current !== null && secondElement.current !== null) {

                // Switch the two selected Elements
                currentBoard[firstElement.current] = board[secondElement.current]
                currentBoard[secondElement.current] = board[firstElement.current]

                // If one of the two Elements is flagged as "lv3", then perform subsequent operation on the board
                // When a lv3 element is switched, all instances of the element it was switched with get removed from the board
                if ((currentBoard[firstElement.current].level === "lv3" || currentBoard[secondElement.current].level === "lv3") &&
                    currentBoard[firstElement.current].level !== currentBoard[secondElement.current].level) {

                    let interceptedElements = []

                    // Store the lv3 Element
                    const lv3 = currentBoard[firstElement.current].level === "lv3" ? firstElement.current : secondElement.current

                    // Store the element it was switched with
                    const eliminateColor = currentBoard[firstElement.current].level === "lv3" ?
                        currentBoard[secondElement.current].color : currentBoard[firstElement.current].color

                    // Mark all instances of the element that was switched with the lv3 element as having to be removed
                    // Store advanced Elements of that specific color in the interceptedElements Array 
                    currentBoard = currentBoard.map((element, i) => {
                        if (element.color === eliminateColor && (element.level === "lv1" || element.level === "")) {
                            element.flag = "removed"
                        } else if (element.color === eliminateColor) {
                            interceptedElements.push({ index: i, level: currentBoard[i].level })
                        }
                        return element
                    })

                    // Trigger the advanced elements captured by the lv3 Element via the handler-function
                    handleInterceptedElements(interceptedElements, currentBoard, board)

                    // Lastly, mark the lv3 element as having to be removed
                    currentBoard[lv3].flag = "removed"
                }
                // After successfully operating with both elements, set them to null again and set the new state for the board
                firstElement.current = null
                secondElement.current = null
                setBoard(currentBoard)
            }
        }
    }

    return (
        <>
            <div className={BoardStyles.board} gameover={JSON.stringify(gameOver)}>
                {board.map((element, index) => (
                    <Element
                        target={element}
                        index={index}
                        key={index}
                        handleElementState={handleElementState}
                    />
                ))}
            </div>
        </>
    )
}
export default Board