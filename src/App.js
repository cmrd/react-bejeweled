import { useCallback, useEffect, useRef, useState } from "react"
import "./index.css"

const width = 8
const colors = ["yellow", "green", "blue", "red", "orange", "purple", "pink"]
const invalidIndices = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63] //indices to skip when checking for matches in a row

function App() {

  const [board, setBoard] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const dragStartRef = useRef()
  const dragEnterRef = useRef()

  // create an 8x8 board randomly filled with 7 different colors

  const createBoard = () => {
    let colorSet = []
    let colorSetDupe = []
    let colorsCopy = [...colors]
    let randomized = false
    let counter = -1

    for (let i = 0; i < width * width; i++) {
      colorSet.push(colors[Math.floor(Math.random() * colors.length)])
    }

    colorSetDupe = [...colorSet]

    // Further randomize board 

    while (!randomized) {

      for (let i = 0; i < width * width; i++) {
        if ((!invalidIndices.includes(i) && colorSet[i] === colorSet[i + 1] && colorSet[i] === colorSet[i + 2]) ||
          (i < 48 && colorSet[i] === colorSet[i + width] && colorSet[i] === colorSet[i + width * 2])) {

          colorsCopy.splice(i, 1)
          colorSet[i] = colorsCopy[Math.floor(Math.random() * colorsCopy.length)]
          colorsCopy = [...colors]

        }
      }

      for (let i = 0; i < width * width; i++) {
        if (colorSet[i] !== colorSetDupe[i]) {
          colorSetDupe = [...colorSet]
          counter = -1
          break
        }
        counter = i
      }
      if (counter === 63) randomized = true
    }

    setBoard([...colorSet])
  }

  // Monitor board for possible moves. If no moves are left, Game Over

  const monitorBoard = useCallback(() => {

    // Rows
    for (let i = 0; i < width * width; i++) {
      if (!invalidIndices.includes(i) &&
        ((board[i] === board[i + 1] && board[i] === board[i + 3]) ||
          (board[i] === board[i + 2] && board[i] === board[i + 3]) ||
          (board[i] === board[i - (width - 1)] && board[i] === board[i - (width - 2)]) ||
          (board[i] === board[i - (width - 1)] && board[i] === board[i + 2]) ||
          (board[i] === board[i + (width + 1)] && board[i] === board[i + (width + 2)]) ||
          (board[i] === board[i + (width + 1)] && board[i] === board[i + 2]))) {
        return true
      }
    }
    // Columns
    for (let i = 0; i < 48; i++) {
      if ((board[i] === board[i + width] && board[i] === board[i + width * 3]) ||
        (board[i] === board[i + width * 2] && board[i] === board[i + width * 3]) ||
        (board[i] === board[i + (width - 1)] && board[i] === board[i + (width * 2 - 1)]) ||
        (board[i] === board[i + (width - 1)] && board[i] === board[i + (width * 2)]) ||
        (board[i] === board[i + (width + 1)] && board[i] === board[i + (width * 2 + 1)]) ||
        (board[i] === board[i + (width + 1)] && board[i] === board[i + (width * 2)])) {
        return true
      }
    }
    return false // no match found
  }, [board])

  // check for vertical sequences (columns) of 3, 4 or 5 elements of the same color

  const verticalMatches = useCallback(prev => {
    let indices = []
    let tempBoard = [...prev]

    for (let i = 0; i < 48; i++) {
      if (board[i] === board[i + width] && board[i] === board[i + width * 2]) {
        indices.push(i, i + width, i + width * 2)
      }
    }

    setScore(score => score + indices.length)

    indices = [...new Set(indices)] //removes duplicate elements

    for (let i = 0; i < indices.length; i++) {
      tempBoard[indices[i]] = ""
    }

    return [...tempBoard]

  }, [board])

  // check for horizontal sequences (rows) of 3, 4 or 5 elements of the same color

  const horizontalMatches = useCallback(prev => {

    let indices = []
    let tempBoard = [...prev]

    for (let i = 0; i < 64; i++) {

      if (invalidIndices.includes(i)) continue

      if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
        indices.push(i, i + 1, i + 2)
      }
    }

    setScore(score => score + indices.length)

    indices = [...new Set(indices)] //removes duplicate elements

    for (let i = 0; i < indices.length; i++) {
      tempBoard[indices[i]] = ""
    }

    return [...tempBoard]

  }, [board])

  // refill board
  // (1) by moving elements from the top down the bottom to refill empty spots
  // (2) creating new elements to refill remaining empty spots at the top

  const refill = useCallback(prev => {
    let tempBoard = [...prev]

    for (let i = 0; i < 56; i++) {
      if (board[i] === "" && i < 8) {
        tempBoard[i] = colors[Math.floor(Math.random() * colors.length)]
      }

      if (board[i] !== "" && board[i + width] === "") {
        tempBoard[i + width] = tempBoard[i]
        tempBoard[i] = ""
      }
    }
    return [...tempBoard]
  }, [board])

  // Functions to handle the drag and drop of an element

  const dragStart = e => {
    dragStartRef.current = e.target
  }

  const dragEnter = e => {
    if (dragStartRef.current.id !== e.target.id) {
      dragEnterRef.current = e.target
    }
  }

  const dragEnd = e => {
    const tempBoard = [...board]
    const startId = parseInt(dragStartRef.current.id)
    const enterId = parseInt(dragEnterRef.current.id)
    let matchFound = false

    const validMoves = [
      startId + 1,
      startId - 1,
      startId + width,
      startId - width
    ].filter(value => value >= 0).filter(value => value < 64)

    if (validMoves.includes(enterId)) {

      tempBoard[startId] = dragEnterRef.current.style.backgroundColor
      tempBoard[enterId] = dragStartRef.current.style.backgroundColor

      // check for match in a column or row, stop at first match
      for (let i = 0; i < 48; i++) {
        if (tempBoard[i] === tempBoard[i + width] && tempBoard[i] === tempBoard[i + width * 2]) {
          matchFound = true
          break
        }
      }
      //check row if matchFound is still false
      if (!matchFound) {
        for (let i = 0; i < 64; i++) {
          if (invalidIndices.includes(i)) continue
          if (tempBoard[i] === tempBoard[i + 1] && tempBoard[i] === tempBoard[i + 2]) {
            matchFound = true
            break
          }
        }
      }
    }

    if (matchFound) setBoard([...tempBoard])

    dragStartRef.current = null
    dragEnterRef.current = null
  }

  // Run only initially to create board
  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {

    const delay = setTimeout(() => {
      let match = false

      for (let i = 0; i < width * width; i++) {
        if (invalidIndices.includes(i)) continue
        if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
          match = true
          break
        }
      }

      if (!match) {
        for (let i = 0; i < 48; i++) {
          if (board[i] === board[i + width] && board[i] === board[i + width * 2]) {
            match = true
            break
          }
        }
      }

      if (!gameOver && board.every(element => element !== "") && !match && !monitorBoard()) {
        setGameOver(() => !gameOver)
      }
    }, 150)

    return () => clearTimeout(delay)

  }, [gameOver, setGameOver, board, monitorBoard])

  useEffect(() => {

    const timer = setInterval(() => {
      // check for matches only once board is completely refilled
      if (board.every(element => element !== "")) {
        setBoard(prev => verticalMatches(prev))
        setBoard(prev => horizontalMatches(prev))

      }
      setBoard(prev => refill(prev))
    }, 100)

    return () => clearInterval(timer)

  }, [verticalMatches, horizontalMatches, refill, board])

  return (
    <>
      <div className="score">Current Score: {score}</div>
      <div className="game">
        {board.map((color, index) => (

          <div
            className={`element ${color}`}
            key={index}
            id={index}
            style={{ backgroundColor: color }}
            draggable
            onDragStart={e => dragStart(e)}
            onDragEnter={e => dragEnter(e)}
            onDragEnd={e => dragEnd(e)}
          >
          </div>
        ))}
      </div>
      <div className="status" style={{display: gameOver ? "block" : "none"}}>No moves left. Game Over</div>
    </>
  )
}

export default App;

