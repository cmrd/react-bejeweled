
export const initialState = {
    rook: { status: "", disabled: false },
    bishop: { status: "", disabled: false },
    knight: { status: "", disabled: false },
    queen: { status: "", disabled: false }
}

export const handleState = (state, action) => {

    let updatedJokerState = {}

    switch (action.type) {

        case "ROOK_SELECTED": {
            updatedJokerState = {
                ...state,
                rook: { ...state.rook, status: state.rook.status === "selected" ? "" : "selected" },
                bishop: { ...state.bishop, status: "" },
                knight: { ...state.knight, status: "" },
                queen: { ...state.queen, status: "" }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }

        case "BISHOP_SELECTED": {
            updatedJokerState = {
                ...state,
                bishop: { ...state.bishop, status: state.bishop.status === "selected" ? "" : "selected" },
                rook: { ...state.rook, status: "" },
                knight: { ...state.knight, status: "" },
                queen: { ...state.queen, status: "" }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }

        case "KNIGHT_SELECTED": {
            updatedJokerState = {
                ...state,
                knight: { ...state.knight, status: state.knight.status === "selected" ? "" : "selected" },
                rook: { ...state.rook, status: "" },
                bishop: { ...state.bishop, status: "" },
                queen: { ...state.queen, status: "" }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }
        case "QUEEN_SELECTED": {
            updatedJokerState = {
                ...state,
                queen: { ...state.queen, status: state.queen.status === "selected" ? "" : "selected" },
                rook: { ...state.rook, status: "" },
                bishop: { ...state.bishop, status: "" },
                knight: { ...state.knight, status: "" }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }
        case "ROOK_UTILIZED": {
            updatedJokerState = {
                ...state,
                rook: { status: "", disabled: true }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }
        case "BISHOP_UTILIZED": {
            updatedJokerState = {
                ...state,
                bishop: { status: "", disabled: true }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }
        case "KNIGHT_UTILIZED": {
            updatedJokerState = {
                ...state,
                knight: { status: "", disabled: true }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }
        case "QUEEN_UTILIZED": {
            updatedJokerState = {
                ...state,
                queen: { status: "", disabled: true }
            }
            localStorage.setItem("jokerState", JSON.stringify(updatedJokerState))
            return updatedJokerState
        }

        case "RESET": {
            localStorage.removeItem("jokerState")
            return initialState
        }

        default:
            return state
    }
}